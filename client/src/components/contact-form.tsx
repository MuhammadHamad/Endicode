import { motion } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { WHATSAPP_URL } from "@/lib/utils";

// Max lengths mirror insertContactSchema in shared/schema.ts, so over-long input gets an
// inline error here instead of a rejected submission.
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be 100 characters or fewer"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email must be 254 characters or fewer"),
  company: z.string().max(200, "Company must be 200 characters or fewer").optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be 5,000 characters or fewer"),
  // Honeypot — see the hidden input below. Real visitors leave it empty.
  website: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please accept the privacy policy to continue" }),
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
      website: "",
      consent: false as unknown as true,
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      // Don't ship the consent flag to the API — it's a UI gate, not data.
      const { consent, ...payload } = data;
      void consent;
      return apiRequest('POST', '/api/contact', payload);
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Message sent successfully! We'll be in touch within 24 hours.",
      });
      form.reset();
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
      transition={{ duration: 0.5 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} data-testid="input-email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-company" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Honeypot: off-screen, out of the tab order and hidden from assistive tech, so only
              bots fill it in; the API silently drops submissions where it isn't empty.
              data-1p-ignore / data-lpignore stop 1Password and LastPass autofilling it. */}
          <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
            <label>
              Leave this field empty
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                data-1p-ignore
                data-lpignore="true"
                {...form.register("website")}
              />
            </label>
          </div>

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
                    className="resize-none"
                    data-testid="input-message"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start gap-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value === true}
                    onCheckedChange={(checked) => field.onChange(checked === true)}
                    data-testid="input-consent"
                  />
                </FormControl>
                <div className="leading-tight">
                  <FormLabel className="text-sm font-normal text-muted-foreground cursor-pointer">
                    I agree to the{" "}
                    <Link href="/privacy">
                      <span className="text-electric-blue hover:underline cursor-pointer">
                        Privacy Policy
                      </span>
                    </Link>{" "}
                    and consent to Endicode processing my message to respond to my enquiry.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground"
              disabled={submitMutation.isPending}
              data-testid="button-send-message"
            >
              {submitMutation.isPending ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 block"
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
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
