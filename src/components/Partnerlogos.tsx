// components/PartnerLogos.tsx
// Usage: import PartnerLogos from '@/components/PartnerLogos'
// Then add <PartnerLogos /> anywhere in your homepage JSX

import React from "react";

interface Partner {
    name: string;
    src: string;
    height: number;
    href: string | null;
}

const partners: Partner[] = [
    {
        name: "Air India",
        src: "/assets/air-india-logo.png",
        height: 80,
        href: "https://www.airindia.com/",
    },
    {
        name: "Vistara",
        src: "/vistara.webp",
        height: 72,
        href: null,
    },
    {
        name: "SpiceJet",
        src: "/assets/SpiceJet-Logo.webp",
        height: 72,
        href: "https://www.spicejet.com/",
    },
    {
        name: "ISO",
        src: "/iso.webp",
        height: 80,
        href: "https://www.iso.org/home.html",
    },
    {
        name: "Thomas Cook",
        src: "/thomas-cook.webp",
        height: 80,
        href: "https://www.thomascook.in/",
    },
    {
        name: "GyanDhan",
        src: "/gyandhan.webp",
        height: 72,
        href: "https://www.gyandhan.com/",
    },
    {
        name: "Thomas Cook 2",
        src: "/thomas-cook1.webp",
        height: 72,
        href: "https://www.thomascook.in/",
    },
];

const styles = `
    .partners-bar {
        width: 100%;
        background: #eef6fb;
        padding: 28px 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 1px solid #dce9f5;
        border-bottom: 1px solid #dce9f5;
    }

    .partners-inner {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        max-width: 1400px;
        width: 100%;
        gap: 0;
    }

    .partner-item {
        display: flex;
        align-items: center;
        position: relative;
    }

    .logo-wrap {
        padding: 0 32px;
        display: flex;
        align-items: center;
        opacity: 0.88;
        transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .logo-wrap:hover {
        opacity: 1;
        transform: scale(1.07);
    }

    .logo-link {
        display: flex;
        align-items: center;
        text-decoration: none;
        cursor: pointer;
    }

    .partner-logo {
        width: auto;
        object-fit: contain;
        max-width: 100%;
    }

    .divider {
        width: 1px;
        height: 52px;
        background: #b8cfe0;
        flex-shrink: 0;
    }

    @media (max-width: 900px) {
        .logo-wrap {
            padding: 12px 20px;
        }
        .divider {
            display: none;
        }
        .partners-inner {
            gap: 8px;
        }
    }

    @media (max-width: 480px) {
        .logo-wrap {
            padding: 10px 14px;
        }
    }
`;

export default function PartnerLogos(): JSX.Element {
    return (
        <>
            <style>{styles}</style>
            <section className="partners-bar">
                <div className="partners-inner">
                    {partners.map((partner: Partner, index: number) => (
                        <div key={partner.name} className="partner-item">
                            <div className="logo-wrap">
                                {partner.href ? (
                                    <a
                                        href={partner.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="logo-link"
                                        aria-label={`Visit ${partner.name}`}
                                    >
                                        <img
                                            src={partner.src}
                                            alt={partner.name}
                                            height={partner.height}
                                            className="partner-logo"
                                        />
                                    </a>
                                ) : (
                                    <img
                                        src={partner.src}
                                        alt={partner.name}
                                        height={partner.height}
                                        className="partner-logo"
                                    />
                                )}
                            </div>
                            {index < partners.length - 1 && (
                                <span className="divider" aria-hidden="true" />
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}