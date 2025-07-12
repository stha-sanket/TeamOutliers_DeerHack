import React from 'react';
import { Facebook, Instagram, Twitter, Github, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[var(--background-sec)] shadow py-12 border-b border-b-[#8686864d]">
            <div className="max-w-6xl mx-auto px-4">
                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center gap-8 mb-8">
                    <a href="#" className="">
                        About
                    </a>
                    <a href="#" className="">
                        Blog
                    </a>
                    <a href="#" className="">
                        Jobs
                    </a>
                    <a href="#" className="">
                        Press
                    </a>
                    <a href="#" className="">
                        Accessibility
                    </a>
                    <a href="#" className="">
                        Partners
                    </a>
                </div>

                {/* Social Media Icons */}
                <div className="flex justify-center gap-6 mb-8">
                    <a href="#">
                        <Facebook size={24} />
                    </a>
                    <a href="#">
                        <Instagram size={24} />
                    </a>
                    <a href="#">
                        <Twitter size={24} />
                    </a>
                    <a href="#">
                        <Github size={24} />
                    </a>
                    <a href="#">
                        <Youtube size={24} />
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-center">
                    <p className="sec-para">
                        © 2024 ConceptC.com, All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;