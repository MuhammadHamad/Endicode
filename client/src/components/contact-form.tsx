import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Message sent successfully! We'll be in touch within 24 hours.",
      });
      form.reset();
      
      // Analytics tracking (placeholder for future implementation)
      if (typeof (window as any)._endAnalytics === 'function') {
        (window as any)._endAnalytics('contact_form_submit', form.getValues());
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      console.error('Contact form error:', error);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    submitMutation.mutate(data);
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
          {/* Name and Email Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        data-testid="input-name"
                        className="transition-all focus:scale-[1.02]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        {...field} 
                        data-testid="input-email"
                        className="transition-all focus:scale-[1.02]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          </div>

          {/* Company Row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        data-testid="input-company"
                        className="transition-all focus:scale-[1.02]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message *</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      rows={4}
                      placeholder="Tell us about your project and automation needs..."
                      className="resize-none transition-all focus:scale-[1.01]"
                      data-testid="input-message"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {/* Submit Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground"
                disabled={submitMutation.isPending}
                data-testid="button-send-message"
              >
                {submitMutation.isPending ? (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Sending...
                  </motion.span>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </motion.div>
            
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <a 
                href="https://wa.me/923339535430?text=Hi%20Endicode%2C%20I%27m%20interested%20in%20your%20services%20and%20would%20like%20to%20discuss%20my%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block"
              >
                <Button 
                  type="button"
                  variant="outline"
                  className="w-full"
                  data-testid="button-whatsapp-contact"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat on WhatsApp
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
}
