import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about/" },
    { label: "How It Works", href: "/how-it-works/" },
    { label: "Pricing", href: "/pricing/" },
    { label: "Contact", href: "/contact/" },
  ],
  support: [
    { label: "FAQ", href: "/faq/" },
    { label: "Help Center", href: "/contact/" },
    { label: "Safety", href: "/pricing/" },
    { label: "Trust & Insurance", href: "/pricing/" },
  ],
  legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Beta Banner */}
      <div className="bg-accent py-3 text-center">
        <p className="text-sm font-medium text-accent-foreground">
          <MapPin className="inline-block w-4 h-4 mr-1 -mt-0.5" />
          Currently available in the <strong>Midwest</strong> during beta testing.
          <Link href="/about/" className="underline ml-1 hover:no-underline">
            Learn more
          </Link>
        </p>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo.png"
                alt="Fast Quick Whipz"
                width={180}
                height={50}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-primary-foreground/80 mb-6 max-w-sm">
              The Midwest&apos;s premier peer-to-peer car sharing platform.
              Transparent pricing, local support, and vehicles you can trust.
            </p>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Serving IL, MI, WI, MN, IN, OH
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                support@fqwhipz.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                (888) FQ-WHIPZ
              </p>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            &copy; {new Date().getFullYear()} Fast Quick Whipz. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
