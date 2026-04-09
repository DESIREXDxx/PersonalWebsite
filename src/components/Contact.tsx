import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { Send, MapPin, Mail } from "lucide-react";

// Secure validation schema
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Name contains invalid characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Message sent successfully!", {
      description: "I'll get back to you as soon as possible.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-secondary/10 to-background pointer-events-none" />

      <div className="container relative px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            <span className="text-gradient text-glow">{"/*"}</span>
            {" Contact "}
            <span className="text-gradient text-glow">{"*/"}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-display font-bold mb-4 text-foreground">
                Let's work together
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                I'm always excited to collaborate on innovative web projects.
                Whether you need a stunning 3D experience, a performant web app,
                or anything in between, I'm here to help bring your vision to life.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <span className="font-body">Gomolemobaholo98@gmail.com</span>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <span className="font-body">Polokwane, LP</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-6 p-8 rounded-2xl card-glow"
            noValidate
          >
            <div>
              <Input
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="bg-secondary/50 border-border focus:border-primary"
                aria-label="Your name"
                aria-invalid={!!errors.name}
                maxLength={100}
              />
              {errors.name && (
                <p className="text-destructive text-sm mt-1 font-body">{errors.name}</p>
              )}
            </div>

            <div>
              <Input
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className="bg-secondary/50 border-border focus:border-primary"
                aria-label="Your email"
                aria-invalid={!!errors.email}
                maxLength={255}
              />
              {errors.email && (
                <p className="text-destructive text-sm mt-1 font-body">{errors.email}</p>
              )}
            </div>

            <div>
              <Textarea
                name="message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                className="bg-secondary/50 border-border focus:border-primary min-h-[150px] resize-none"
                aria-label="Your message"
                aria-invalid={!!errors.message}
                maxLength={1000}
              />
              {errors.message && (
                <p className="text-destructive text-sm mt-1 font-body">{errors.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Send Message
                  <Send className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
