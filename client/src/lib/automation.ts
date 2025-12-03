export interface LeadAnalysis {
  intent: string;
  urgency: 'High' | 'Normal';
  complexity: 'Small' | 'Medium' | 'Large';
  recommendation: string;
  priceRange: string;
  detectedIndustry?: string;
  industryMismatch?: boolean;
}

export interface IndustryDetection {
  detected: string | null;
  confidence: 'high' | 'medium' | 'low';
  keywords: string[];
}

export interface LeadData {
  name?: string;
  email: string;
  company?: string;
  message: string;
  score: number;
  segment: 'Hot' | 'Warm' | 'Cold';
}

export function detectIndustryFromText(text: string): IndustryDetection {
  const lowerText = text.toLowerCase();
  const industryKeywords: Record<string, { keywords: string[], weight: number }> = {
    'ecommerce': {
      keywords: ['ecommerce', 'e-commerce', 'online store', 'shopify', 'woocommerce', 'online shop', 'retail', 'selling online', 'merchant', 'storefront'],
      weight: 3
    },
    'healthcare': {
      keywords: ['healthcare', 'health care', 'medical', 'hospital', 'clinic', 'patient', 'hipaa', 'pharmacy', 'health', 'doctor', 'physician', 'healthcare provider'],
      weight: 3
    },
    'finance': {
      keywords: ['finance', 'financial', 'banking', 'bank', 'investment', 'trading', 'fintech', 'accounting', 'payments', 'crypto', 'blockchain', 'loan', 'credit'],
      weight: 3
    },
    'saas': {
      keywords: ['saas', 'software as a service', 'subscription', 'platform', 'app', 'application', 'software product', 'b2b software'],
      weight: 2
    }
  };

  let maxScore = 0;
  let detectedIndustry: string | null = null;
  let matchedKeywords: string[] = [];

  for (const [industryKey, data] of Object.entries(industryKeywords)) {
    let score = 0;
    const foundKeywords: string[] = [];
    
    for (const keyword of data.keywords) {
      if (lowerText.includes(keyword)) {
        score += data.weight;
        foundKeywords.push(keyword);
      }
    }

    if (score > maxScore) {
      maxScore = score;
      detectedIndustry = industryKey;
      matchedKeywords = foundKeywords;
    }
  }

  let confidence: 'high' | 'medium' | 'low' = 'low';
  if (maxScore >= 6) confidence = 'high';
  else if (maxScore >= 3) confidence = 'medium';

  return {
    detected: detectedIndustry,
    confidence,
    keywords: matchedKeywords
  };
}

export function analyzeInquiry(
  text: string, 
  industry?: string, 
  budget?: string
): LeadAnalysis {
  const lowerText = text.toLowerCase();
  const sanitizedIndustry = industry && industry !== 'other' ? industry : undefined;
  
  // Detect industry from text
  const industryDetection = detectIndustryFromText(text);
  const detectedIndustry = industryDetection.detected;
  let industryMismatch = false;
  let finalIndustry = sanitizedIndustry;

  // Intelligent industry matching
  if (detectedIndustry && sanitizedIndustry) {
    // Check for mismatch
    if (detectedIndustry !== sanitizedIndustry && industryDetection.confidence !== 'low') {
      industryMismatch = true;
      // Use detected industry if confidence is high, otherwise use selected
      if (industryDetection.confidence === 'high') {
        finalIndustry = detectedIndustry;
      }
    }
  } else if (detectedIndustry && !sanitizedIndustry && industryDetection.confidence !== 'low') {
    // Auto-select detected industry if none selected
    finalIndustry = detectedIndustry;
  }
  
  // Intent classification
  let intent = 'general';
  if (lowerText.includes('website') || lowerText.includes('web')) intent = 'website';
  if (lowerText.includes('ecommerce') || lowerText.includes('e-commerce') || lowerText.includes('shop')) intent = 'ecommerce';
  if (lowerText.includes('automat') || lowerText.includes('workflow') || lowerText.includes('process')) intent = 'automation';
  if (lowerText.includes('ai') || lowerText.includes('bot') || lowerText.includes('assistant')) intent = 'ai-assistant';
  if (lowerText.includes('data') || lowerText.includes('pipeline') || lowerText.includes('integration')) intent = 'data-pipeline';
  
  // Urgency detection
  const urgentKeywords = ['urgent', 'asap', 'this week', 'today', 'immediately', 'rush', 'deadline', 'launch'];
  const isUrgent = urgentKeywords.some(keyword => lowerText.includes(keyword));
  
  // Complexity scoring - improved algorithm
  let complexity: 'Small' | 'Medium' | 'Large' = 'Small';
  let score = 0;
  
  // Base score from text length
  if (text.length > 100) score += 2;
  if (text.length > 200) score += 3;
  if (text.length > 400) score += 3;
  
  // Integration mentions (more weight)
  const integrations = ['shopify', 'quickbooks', 'salesforce', 'hubspot', 'slack', 'sheets', 'zapier', 'api', 'webhook'];
  const integrationCount = integrations.filter(integration => lowerText.includes(integration)).length;
  score += integrationCount * 4;
  
  // Technical complexity indicators
  const complexTerms = ['custom', 'enterprise', 'migration', 'legacy', 'scalable', 'multi', 'platform'];
  const complexCount = complexTerms.filter(term => lowerText.includes(term)).length;
  score += complexCount * 2;
  
  // Industry-based complexity adjustments (use final industry)
  if (finalIndustry === 'healthcare' || finalIndustry === 'finance') {
    score += 5; // More complex due to compliance requirements
  } else if (finalIndustry === 'saas') {
    score += 3;
  }
  
  // Budget-based complexity adjustments
  if (budget === '35k-70k') {
    score += 4;
  } else if (budget === '70k+') {
    score += 6;
  } else if (budget === '10k-35k') {
    score += 2;
  }
  
  // Multiple requirements mentioned
  const requirementKeywords = ['and', 'also', 'plus', 'additionally', 'need', 'require'];
  const requirementCount = requirementKeywords.filter(keyword => lowerText.includes(keyword)).length;
  if (requirementCount > 3) score += 3;
  
  // Determine complexity with adjusted thresholds
  if (score >= 12) complexity = 'Large';
  else if (score >= 6) complexity = 'Medium';
  
  // Generate recommendation based on intent, industry, and budget
  let recommendation = '';
  let priceRange = '';
  
  // Industry-specific recommendations (use final industry)
  const industryPrefix = finalIndustry ? `${finalIndustry.charAt(0).toUpperCase() + finalIndustry.slice(1)}-focused ` : '';
  
  switch(intent) {
    case 'website':
      recommendation = industryPrefix + 'Foundational website + SEO optimization';
      if (budget === '3k-10k') {
        priceRange = '$3K-$8K';
      } else if (budget === '10k-35k') {
        priceRange = complexity === 'Small' ? '$8K-$15K' : '$15K-$25K';
      } else if (budget === '35k-70k') {
        priceRange = complexity === 'Medium' ? '$25K-$40K' : '$40K-$60K';
      } else if (budget === '70k+') {
        priceRange = '$60K+';
      } else {
        priceRange = complexity === 'Small' ? '$3K-$10K' : complexity === 'Medium' ? '$10K-$20K' : '$20K+';
      }
      break;
    case 'ecommerce':
      recommendation = industryPrefix + 'E-commerce platform + payment automation';
      if (budget === '3k-10k') {
        priceRange = '$8K-$12K';
        complexity = 'Small';
      } else if (budget === '10k-35k') {
        priceRange = complexity === 'Small' ? '$12K-$20K' : '$20K-$30K';
      } else if (budget === '35k-70k') {
        priceRange = complexity === 'Medium' ? '$30K-$50K' : '$50K-$65K';
      } else if (budget === '70k+') {
        priceRange = '$65K+';
        complexity = 'Large';
      } else {
        priceRange = complexity === 'Small' ? '$10K-$20K' : complexity === 'Medium' ? '$20K-$40K' : '$40K+';
      }
      break;
    case 'automation':
      if (finalIndustry === 'healthcare') {
        recommendation = 'HIPAA-compliant process automation + workflow orchestration';
      } else if (finalIndustry === 'finance') {
        recommendation = 'Secure financial process automation + compliance workflows';
      } else if (finalIndustry === 'saas') {
        recommendation = 'SaaS workflow automation + API integrations';
      } else {
        recommendation = industryPrefix + 'Process automation + workflow orchestration';
      }
      if (budget === '3k-10k') {
        priceRange = '$7K-$10K';
        complexity = 'Small';
      } else if (budget === '10k-35k') {
        priceRange = complexity === 'Small' ? '$10K-$18K' : '$18K-$30K';
      } else if (budget === '35k-70k') {
        priceRange = complexity === 'Medium' ? '$30K-$50K' : '$50K-$65K';
      } else if (budget === '70k+') {
        priceRange = '$65K+';
        complexity = 'Large';
      } else {
        priceRange = complexity === 'Small' ? '$7K-$18K' : complexity === 'Medium' ? '$18K-$35K' : '$35K+';
      }
      break;
    case 'ai-assistant':
      if (finalIndustry === 'healthcare') {
        recommendation = 'Healthcare AI assistant + HIPAA-compliant knowledge base';
      } else if (finalIndustry === 'finance') {
        recommendation = 'Financial AI assistant + secure data integration';
      } else {
        recommendation = industryPrefix + 'AI assistant + knowledge base integration';
      }
      if (budget === '3k-10k') {
        priceRange = '$10K-$12K';
        complexity = 'Small';
      } else if (budget === '10k-35k') {
        priceRange = complexity === 'Small' ? '$12K-$25K' : '$25K-$32K';
      } else if (budget === '35k-70k') {
        priceRange = complexity === 'Medium' ? '$32K-$55K' : '$55K-$68K';
      } else if (budget === '70k+') {
        priceRange = '$68K+';
        complexity = 'Large';
      } else {
        priceRange = complexity === 'Small' ? '$10K-$25K' : complexity === 'Medium' ? '$25K-$50K' : '$50K+';
      }
      break;
    default:
      recommendation = industryPrefix + 'Discovery session + custom solution';
      if (budget === '3k-10k') {
        priceRange = '$3K-$8K';
      } else if (budget === '10k-35k') {
        priceRange = '$8K-$30K';
      } else if (budget === '35k-70k') {
        priceRange = '$30K-$65K';
      } else if (budget === '70k+') {
        priceRange = '$65K+';
      } else {
        priceRange = 'TBD after consultation';
      }
  }
  
  return {
    intent: intent.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    urgency: isUrgent ? 'High' : 'Normal',
    complexity,
    recommendation,
    priceRange,
    detectedIndustry: detectedIndustry || undefined,
    industryMismatch: industryMismatch || undefined
  };
}

export function generateDraftReply(analysis: LeadAnalysis, industry?: string, budget?: string): string {
  const urgencyNote = analysis.urgency === 'High' 
    ? '\n\nI understand this is time-sensitive, so I\'ve prioritized your inquiry. We can expedite the timeline if needed.' 
    : '';
  
  const timeline = analysis.complexity === 'Small' ? '2-3 weeks' : 
                   analysis.complexity === 'Medium' ? '4-6 weeks' : '6-8 weeks';
  
  // Use detected industry if available, otherwise use selected
  const sanitizedIndustry = industry === 'other' ? undefined : industry;
  const effectiveIndustry = analysis.detectedIndustry || sanitizedIndustry;
  
  const industryNote = effectiveIndustry 
    ? `\n\nGiven your ${effectiveIndustry} industry, we'll ensure compliance with relevant regulations and industry best practices.`
    : '';
  
  const mismatchNote = analysis.industryMismatch && analysis.detectedIndustry
    ? `\n\nNote: I detected ${analysis.detectedIndustry} industry indicators in your inquiry. If this differs from your selection, please let me know so we can tailor the solution accurately.`
    : '';
  
  const budgetNote = budget
    ? `\n\nBased on your budget range (${budget}), we can tailor the solution to maximize value within your investment.`
    : '';
  
  const complexityNote = analysis.complexity === 'Large'
    ? '\n\nThis is a substantial project that will require careful planning and phased delivery. We recommend starting with a discovery phase to map out all requirements.'
    : analysis.complexity === 'Medium'
    ? '\n\nThis project will involve multiple components that we can deliver in phases for better manageability.'
    : '\n\nThis project is well-scoped and we can move quickly to get you results.';
  
  return `Hi there,

Thank you for reaching out to Endicode! Based on your inquiry, I can see you're looking for ${analysis.intent.toLowerCase()} solutions.

Here's what I recommend:
• ${analysis.recommendation}
• Estimated investment: ${analysis.priceRange}
• Timeline: ${timeline}
• Complexity: ${analysis.complexity}${complexityNote}${industryNote}${mismatchNote}${budgetNote}${urgencyNote}

I'd love to discuss this further and show you exactly how we can help. Please reach out on WhatsApp so we can chat about your project details.

Best regards,
The Endicode Team

P.S. Feel free to try our automation demo to see the kind of intelligent workflows we build: ${window.location.origin}/demo`;
}

export function scoreLeads(leads: Omit<LeadData, 'score' | 'segment'>[]): LeadData[] {
  return leads.map(lead => {
    let score = 0;
    const message = (lead.message || '').toLowerCase();
    
    // Keyword scoring
    const automationKeywords = ['automation', 'ai', 'integrate', 'rpa'];
    automationKeywords.forEach(keyword => {
      if (message.includes(keyword)) score += 10;
    });
    
    // Tool mentions
    const tools = ['shopify', 'hubspot', 'quickbooks', 'slack', 'salesforce'];
    tools.forEach(tool => {
      if (message.includes(tool)) score += 5;
    });
    
    // Message length
    if (message.length > 200) score += 5;
    
    // Determine segment
    let segment: 'Hot' | 'Warm' | 'Cold' = 'Cold';
    if (score >= 20) segment = 'Hot';
    else if (score >= 10) segment = 'Warm';
    
    return {
      ...lead,
      score,
      segment
    };
  });
}
