import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Target, Mail, Check, Copy } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { analyzeInquiry, generateDraftReply, scoreLeads, detectIndustryFromText, type LeadAnalysis, type LeadData } from "@/lib/automation";
import { parseCSV, generateCSV, downloadCSV, deduplicateByEmail } from "@/lib/csv";

interface AutomationDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AutomationDemo({ isOpen, onClose }: AutomationDemoProps) {
  const { toast } = useToast();
  
  // Lead Triage State
  const [inquiryText, setInquiryText] = useState("Hi, we're looking for help with our e-commerce platform. We need to integrate with Shopify and automate our order processing. This is urgent - we launch next week!");
  const [industry, setIndustry] = useState("");
  const [budget, setBudget] = useState("");
  const [analysis, setAnalysis] = useState<LeadAnalysis | null>(null);
  const [draftReply, setDraftReply] = useState("");
  const [detectedIndustryInfo, setDetectedIndustryInfo] = useState<{ detected: string | null; confidence: 'high' | 'medium' | 'low' } | null>(null);

  const normalizeIndustry = (value?: string | null) =>
    value && value !== 'other' ? value : undefined;

  // Real-time industry detection as user types
  useEffect(() => {
    if (inquiryText.trim().length > 20) {
      const detection = detectIndustryFromText(inquiryText);
      setDetectedIndustryInfo(detection);
      
      // Auto-update industry if detected with high confidence and no industry selected
      if (detection.detected && detection.confidence === 'high' && !normalizeIndustry(industry)) {
        setIndustry(detection.detected);
      }
    } else {
      setDetectedIndustryInfo(null);
    }
  }, [inquiryText, industry]);

  // CSV State
  const [csvResults, setCsvResults] = useState<LeadData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAnalyzeInquiry = () => {
    if (!inquiryText.trim()) {
      toast({
        title: "Error",
        description: "Please enter an inquiry to analyze",
        variant: "destructive"
      });
      return;
    }

    const normalizedIndustry = normalizeIndustry(industry);
    const result = analyzeInquiry(inquiryText, normalizedIndustry, budget);
    const reply = generateDraftReply(result, normalizedIndustry, budget);
    
    // Intelligent industry detection and auto-update
    if (result.detectedIndustry && !normalizedIndustry && result.detectedIndustry) {
      // Auto-update industry if detected and none selected
      setIndustry(result.detectedIndustry);
      toast({
        title: "Industry Detected",
        description: `We detected ${result.detectedIndustry} industry from your inquiry. Auto-selected for better analysis.`,
      });
    } else if (result.industryMismatch && result.detectedIndustry && normalizedIndustry) {
      // Show warning for mismatch
      toast({
        title: "Industry Mismatch Detected",
        description: `Your inquiry mentions ${result.detectedIndustry} industry, but you selected ${normalizedIndustry}. We've used the detected industry for more accurate analysis.`,
        variant: "default",
      });
      // Auto-update to detected industry for better accuracy
      setIndustry(result.detectedIndustry);
    }
    
    setAnalysis(result);
    setDraftReply(reply);

    if (typeof window._ffAnalytics === 'function') {
      window._ffAnalytics('automation_demo_analyze', { 
        intent: result.intent, 
        industry: result.detectedIndustry || normalizedIndustry, 
        budget, 
        complexity: result.complexity,
        industryMismatch: result.industryMismatch 
      });
    }
  };

  const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Error", 
        description: "Please upload a CSV file",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      const result = await parseCSV(file);
      
      // Filter out empty rows and validate required fields
      const cleanData = result.data.filter((row: any) => 
        row.email && row.email.trim()
      );

      if (cleanData.length === 0) {
        throw new Error("No valid leads found. Please ensure your CSV has 'email' column.");
      }

      // Deduplicate by email
      const deduped = deduplicateByEmail(cleanData);
      
      // Score the leads
      const scored = scoreLeads(deduped);
      
      setCsvResults(scored);

      if (typeof window._ffAnalytics === 'function') {
        window._ffAnalytics('automation_demo_csv_upload', { 
          leads_count: scored.length,
          hot_leads: scored.filter(l => l.segment === 'Hot').length
        });
      }

      toast({
        title: "Success!",
        description: `Processed ${scored.length} leads with scoring complete`
      });

    } catch (error) {
      console.error('CSV processing error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process CSV file",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExportScores = () => {
    if (csvResults.length === 0) return;

    const csvContent = generateCSV(csvResults);
    downloadCSV(csvContent, 'scored_leads.csv');
    
    toast({
      title: "Success!",
      description: "Lead scores exported successfully"
    });
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${type} copied to clipboard`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const copyAnalysis = () => {
    if (!analysis) return;
    
    const text = `Lead Analysis:
• Intent: ${analysis.intent}
• Urgency: ${analysis.urgency}  
• Complexity: ${analysis.complexity}
• Recommendation: ${analysis.recommendation}
• Price Range: ${analysis.priceRange}`;
    
    copyToClipboard(text, "Analysis");
  };

  const getSegmentCounts = () => {
    const hot = csvResults.filter(l => l.segment === 'Hot').length;
    const warm = csvResults.filter(l => l.segment === 'Warm').length;
    const cold = csvResults.filter(l => l.segment === 'Cold').length;
    return { hot, warm, cold };
  };

  const segmentCounts = getSegmentCounts();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto glass-card border-border/50" data-testid="automation-demo-modal">
        <DialogHeader>
          <DialogTitle className="font-display font-bold text-2xl">Automation Demo</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="triage" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="triage" data-testid="tab-lead-triage">Lead Triage</TabsTrigger>
            <TabsTrigger value="csv" data-testid="tab-csv-scorer">CSV Lead Scorer</TabsTrigger>
          </TabsList>

          <TabsContent value="triage" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Side */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-semibold text-xl mb-4">Paste an inquiry</h3>
                  <Textarea
                    value={inquiryText}
                    onChange={(e) => setInquiryText(e.target.value)}
                    placeholder="Hi, we're looking for help with our e-commerce platform..."
                    className="min-h-[120px] resize-none"
                    data-testid="input-inquiry-text"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium">Industry (optional)</label>
                      {detectedIndustryInfo?.detected && detectedIndustryInfo.confidence !== 'low' && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          detectedIndustryInfo.confidence === 'high' 
                            ? 'bg-electric-blue/20 text-electric-blue' 
                            : 'bg-secondary/20 text-secondary'
                        }`}>
                          {detectedIndustryInfo.confidence === 'high' ? '✓ Detected' : '~ Possible'}
                        </span>
                      )}
                    </div>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger 
                        data-testid="select-industry"
                        className={detectedIndustryInfo?.detected && detectedIndustryInfo.detected !== normalizeIndustry(industry) && detectedIndustryInfo.confidence === 'high' 
                          ? 'border-electric-blue/50' 
                          : ''}
                      >
                        <SelectValue placeholder={
                          detectedIndustryInfo?.detected && detectedIndustryInfo.confidence === 'high'
                            ? `Detected: ${detectedIndustryInfo.detected}`
                            : "Select industry"
                        } />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="saas">SaaS</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {detectedIndustryInfo?.detected && detectedIndustryInfo.detected !== normalizeIndustry(industry) && detectedIndustryInfo.confidence === 'high' && industry && (
                      <p className="text-xs text-electric-blue mt-1">
                        💡 Your inquiry suggests <strong>{detectedIndustryInfo.detected}</strong> industry
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Budget Range (optional)</label>
                    <Select value={budget} onValueChange={setBudget}>
                      <SelectTrigger data-testid="select-budget">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3k-10k">$3K - $10K</SelectItem>
                        <SelectItem value="10k-35k">$10K - $35K</SelectItem>
                        <SelectItem value="35k-70k">$35K - $70K</SelectItem>
                        <SelectItem value="70k+">$70K+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    onClick={handleAnalyzeInquiry} 
                    className="w-full bg-primary text-primary-foreground"
                    data-testid="button-analyze-inquiry"
                  >
                    Analyze Inquiry
                  </Button>
                </motion.div>
              </div>

              {/* Results Side */}
              <AnimatePresence>
                {analysis && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                    data-testid="triage-results"
                  >
                    {/* Industry Mismatch Alert */}
                    {analysis.industryMismatch && analysis.detectedIndustry && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <Alert className="border-electric-blue/50 bg-electric-blue/10">
                          <Target className="h-4 w-4 text-electric-blue" />
                          <AlertTitle className="text-electric-blue">Smart Detection</AlertTitle>
                          <AlertDescription className="text-sm">
                            We detected <strong>{analysis.detectedIndustry}</strong> industry indicators in your inquiry. 
                            The analysis has been automatically adjusted to match your inquiry for more accurate recommendations.
                          </AlertDescription>
                        </Alert>
                      </motion.div>
                    )}
                    
                    {/* Auto-detected Industry Alert */}
                    {analysis.detectedIndustry && !industry && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <Alert className="border-secondary/50 bg-secondary/10">
                          <Target className="h-4 w-4 text-secondary" />
                          <AlertTitle className="text-secondary">Industry Auto-Detected</AlertTitle>
                          <AlertDescription className="text-sm">
                            We automatically detected <strong>{analysis.detectedIndustry}</strong> industry from your inquiry 
                            and updated the analysis accordingly for better accuracy.
                          </AlertDescription>
                        </Alert>
                      </motion.div>
                    )}

                    {/* Analysis Card */}
                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Target className="w-5 h-5 text-electric-blue" />
                          <span>Analysis</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Intent:</span>
                          <span className="font-medium" data-testid="result-intent">{analysis.intent}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Urgency:</span>
                          <Badge variant={analysis.urgency === 'High' ? 'destructive' : 'secondary'} data-testid="result-urgency">
                            {analysis.urgency}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Complexity:</span>
                          <span className="font-medium" data-testid="result-complexity">{analysis.complexity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Recommended:</span>
                          <span className="font-medium text-electric-blue" data-testid="result-recommendation">
                            {analysis.recommendation}
                          </span>
                        </div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button onClick={copyAnalysis} variant="outline" size="sm" className="w-full mt-4" data-testid="button-copy-analysis">
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Analysis
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>

                    {/* Draft Reply Card */}
                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Mail className="w-5 h-5 text-secondary" />
                          <span>Draft Reply</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-black/20 rounded-lg p-4 text-sm font-mono text-zinc-300 whitespace-pre-wrap min-h-[120px] mb-4" data-testid="draft-reply">
                          {draftReply}
                        </div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button 
                            onClick={() => copyToClipboard(draftReply, "Reply")} 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            data-testid="button-copy-reply"
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy to Clipboard
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="csv" className="mt-6">
            <div className="space-y-8">
              {/* Upload Section */}
              <div className="text-center">
                <h3 className="font-display font-semibold text-xl mb-4">Upload Lead CSV</h3>
                <p className="text-muted-foreground mb-6">Expected columns: name, email, company, message</p>

                <div className="border-2 border-dashed border-border rounded-xl p-8 hover:border-electric-blue/50 transition-colors">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleCSVUpload}
                    className="hidden"
                    id="csv-upload"
                    data-testid="input-csv-upload"
                  />
                  <label htmlFor="csv-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center">
                        <Upload className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium">Choose CSV file</div>
                        <div className="text-sm text-muted-foreground">or drag and drop</div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Processing State */}
              {isProcessing && (
                <Alert>
                  <AlertDescription>Processing your CSV file...</AlertDescription>
                </Alert>
              )}

              {/* Results Table */}
              <AnimatePresence>
                {csvResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                    data-testid="csv-results"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-lg">Lead Scores</h4>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          onClick={handleExportScores} 
                          className="bg-primary text-primary-foreground"
                          data-testid="button-export-scores"
                        >
                          Export Results
                        </Button>
                      </motion.div>
                    </div>

                    <Card className="glass-card">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-muted/50 border-b border-border/50">
                            <tr>
                              <th className="text-left p-4 font-medium">Name</th>
                              <th className="text-left p-4 font-medium">Company</th>
                              <th className="text-left p-4 font-medium">Score</th>
                              <th className="text-left p-4 font-medium">Segment</th>
                            </tr>
                          </thead>
                          <tbody data-testid="csv-table-body">
                            {csvResults.slice(0, 10).map((lead, index) => (
                              <tr key={index} className="border-b border-border/30 hover:bg-muted/30">
                                <td className="p-4" data-testid={`lead-name-${index}`}>{lead.name || 'N/A'}</td>
                                <td className="p-4" data-testid={`lead-company-${index}`}>{lead.company || 'N/A'}</td>
                                <td className="p-4 font-mono" data-testid={`lead-score-${index}`}>{lead.score}</td>
                                <td className="p-4">
                                  <Badge 
                                    variant={
                                      lead.segment === 'Hot' ? 'default' : 
                                      lead.segment === 'Warm' ? 'secondary' : 'outline'
                                    }
                                    className={
                                      lead.segment === 'Hot' ? 'bg-secondary text-black' :
                                      lead.segment === 'Warm' ? 'bg-yellow-400 text-black' : 'text-muted-foreground'
                                    }
                                    data-testid={`lead-segment-${index}`}
                                  >
                                    {lead.segment}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <Card className="glass-card">
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-muted-foreground" data-testid="count-cold">{segmentCounts.cold}</div>
                          <div className="text-sm text-muted-foreground">Cold Leads</div>
                        </CardContent>
                      </Card>
                      <Card className="glass-card">
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-yellow-400" data-testid="count-warm">{segmentCounts.warm}</div>
                          <div className="text-sm text-muted-foreground">Warm Leads</div>
                        </CardContent>
                      </Card>
                      <Card className="glass-card">
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-secondary" data-testid="count-hot">{segmentCounts.hot}</div>
                          <div className="text-sm text-muted-foreground">Hot Leads</div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
