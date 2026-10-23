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
import OpensInNewTab from "@/components/opens-in-new-tab";
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
          {/* Visual key for the asterisks; screen readers get aria-required on each field. */}
          <p className="text-sm text-muted-foreground" aria-hidden="true">
            * required
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name <span aria-hidden="true">*</span></FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="name" aria-required="true" data-testid="input-name" />
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
                  <FormLabel>Email <span aria-hidden="true">*</span></FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      autoComplete="email"
                      aria-required="true"
                      data-testid="input-email"
                    />
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
                    <Input {...field} autoComplete="organization" data-testid="input-company" />
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
                <FormLabel>Message <span aria-hidden="true">*</span></FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={4}
                    placeholder="Tell us about your project and automation needs..."
                    className="resize-none"
                    aria-required="true"
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
                  {/* ref lets the form focus the box when submitted unticked. aria-required
                      rather than required: Radix would add a native required input that
                      blocks submission before the inline error can show. */}
                  <Checkbox
                    ref={field.ref}
                    checked={field.value === true}
                    onCheckedChange={(checked) => field.onChange(checked === true)}
                    onBlur={field.onBlur}
                    aria-required="true"
                    data-testid="input-consent"
                  />
                </FormControl>
                <div className="leading-tight">
                  <FormLabel className="text-sm font-normal text-muted-foreground cursor-pointer">
                    I agree to the{" "}
                    <Link href="/privacy" className="text-electric-blue hover:underline">
                      Privacy Policy
                    </Link>{" "}
                    and consent to Endicode processing my message to respond to my enquiry.{" "}
                    <span aria-hidden="true">*</span>
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
                  <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                  Send Message
                </>
              )}
            </Button>

            <Button asChild variant="outline" className="flex-1">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-whatsapp-contact"
              >
                <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                Chat on WhatsApp
                <OpensInNewTab />
              </a>
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
