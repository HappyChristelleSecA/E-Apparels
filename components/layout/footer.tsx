import Link from "next/link"
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                EA
              </span>
              <h3 className="text-lg font-semibold">E-Apparels</h3>
            </div>
            <p className="text-sm opacity-70">
              Your trusted e-commerce platform for quality apparel at great prices.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <FaFacebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <FaTwitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <FaInstagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="opacity-70 hover:opacity-100 transition-opacity">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="opacity-70 hover:opacity-100 transition-opacity">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="opacity-70 hover:opacity-100 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="opacity-70 hover:opacity-100 transition-opacity">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-semibold">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="opacity-70 hover:opacity-100 transition-opacity">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/dashboard/orders" className="opacity-70 hover:opacity-100 transition-opacity">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/cart" className="opacity-70 hover:opacity-100 transition-opacity">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/contact" className="opacity-70 hover:opacity-100 transition-opacity">
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact Info</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="h-4 w-4 opacity-60" />
                <span className="opacity-70">123 Commerce St, City, State 12345</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="h-4 w-4 opacity-60" />
                <span className="opacity-70">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="h-4 w-4 opacity-60" />
                <span className="opacity-70">support@e-apparels.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-8 text-center text-sm opacity-60">
          <p>
            &copy; 2026 E-Apparels. All rights reserved. |
            <Link href="/privacy" className="hover:opacity-100 ml-1 underline-offset-4 hover:underline">
              Privacy Policy
            </Link>{" "}
            |
            <Link href="/terms" className="hover:opacity-100 ml-1 underline-offset-4 hover:underline">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
