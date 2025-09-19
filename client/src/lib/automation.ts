export interface LeadAnalysis {
  intent: string;
  urgency: 'High' | 'Normal';
  complexity: 'Small' | 'Medium' | 'Large';
  recommendation: string;
  priceRange: string;
}

export interface LeadData {
  name?: string;
  email: string;
  company?: string;
  message: string;
  score: number;
  segment: 'Hot' | 'Warm' | 'Cold';
}

export function analyzeInquiry(
  text: string, 
  industry?: string, 
  budget?: string
): LeadAnalysis {
  const lowerText = text.toLowerCase();
  
  // Intent classification
  let intent = 'general';
  if (lowerText.includes('website') || lowerText.includes('web')) intent = 'website';
  if (lowerText.includes('ecommerce') || lowerText.includes('e-commerce') || lowerText.includes('shop')) intent = 'ecommerce';
  if (lowerText.includes('automat') || lowerText.includes('workflow') || lowerText.includes('process')) intent = 'automation';
  if (lowerText.includes('ai') || lowerText.includes('bot') || lowerText.includes('assistant')) intent = 'ai-assistant';
  if (lowerText.includes('data') || lowerText.includes('pipeline') || lowerText.includes('integration')) intent = 'data-pipeline';
  
  // Urgency detection
  const urgentKeywords = ['urgent', 'asap', 'this week', 'today', 'immediately', 'rush'];
  const isUrgent = urgentKeywords.some(keyword => lowerText.includes(keyword));
  
  // Complexity scoring
  let complexity: 'Small' | 'Medium' | 'Large' = 'Small';
  let score = 0;
  
  // Length factor
  if (text.length > 200) score += 5;
  if (text.length > 500) score += 5;
  
  // Integration mentions
  const integrations = ['shopify', 'quickbooks', 'salesforce', 'hubspot', 'slack', 'sheets', 'zapier'];
  integrations.forEach(integration => {
    if (lowerText.includes(integration)) score += 5;
  });
  
  // Technical complexity
  const complexTerms = ['api', 'integration', 'custom', 'enterprise', 'migration', 'legacy'];
  complexTerms.forEach(term => {
    if (lowerText.includes(term)) score += 3;
  });
  
  if (score >= 15) complexity = 'Large';
  else if (score >= 8) complexity = 'Medium';
  
  // Generate recommendation
  let recommendation = '';
  let priceRange = '';
  
  switch(intent) {
    case 'website':
      recommendation = 'Foundational website + SEO optimization';
      priceRange = complexity === 'Small' ? '$3K-$10K' : complexity === 'Medium' ? '$10K-$20K' : '$20K+';
      break;
    case 'ecommerce':
      recommendation = 'E-commerce platform + payment automation';
      priceRange = complexity === 'Small' ? '$10K-$20K' : complexity === 'Medium' ? '$20K-$40K' : '$40K+';
      break;
    case 'automation':
      recommendation = 'Process automation + workflow orchestration';
      priceRange = complexity === 'Small' ? '$7K-$18K' : complexity === 'Medium' ? '$18K-$35K' : '$35K+';
      break;
    case 'ai-assistant':
      recommendation = 'AI assistant + knowledge base integration';
      priceRange = complexity === 'Small' ? '$10K-$25K' : complexity === 'Medium' ? '$25K-$50K' : '$50K+';
      break;
    default:
      recommendation = 'Discovery session + custom solution';
      priceRange = 'TBD after consultation';
  }
  
  return {
    intent: intent.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    urgency: isUrgent ? 'High' : 'Normal',
    complexity,
    recommendation,
    priceRange
  };
}

export function generateDraftReply(analysis: LeadAnalysis): string {
  const urgencyNote = analysis.urgency === 'High' 
    ? '\n\nI understand this is time-sensitive, so I\'ve prioritized your inquiry.' 
    : '';
  
  const timeline = analysis.complexity === 'Small' ? '2-3 weeks' : 
                   analysis.complexity === 'Medium' ? '4-6 weeks' : '6-8 weeks';
  
  return `Hi there,

Thank you for reaching out to Endicode! Based on your inquiry, I can see you're looking for ${analysis.intent.toLowerCase()} solutions.

Here's what I recommend:
• ${analysis.recommendation}
• Estimated investment: ${analysis.priceRange}
• Timeline: ${timeline}
${urgencyNote}

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
