"use client"

import {
    Network,
    GitBranch,
    Cpu,
    Activity,
    Zap,
    Shield,
    ArrowRight,
    BarChart3,
    Users,
    Server,
    ChevronDown,
} from "lucide-react"
import type { PageType } from "@/app/page"

interface LandingPageProps {
    setCurrentPage: (page: PageType) => void
}

const colorClasses: Record<string, { bg: string; border: string; text: string; shadow: string }> = {
    primary: {
        bg: "bg-primary/10",
        border: "border-primary/30",
        text: "text-primary",
        shadow: "group-hover:shadow-primary/20",
    },
    accent: {
        bg: "bg-accent/10",
        border: "border-accent/30",
        text: "text-accent",
        shadow: "group-hover:shadow-accent/20",
    },
    success: {
        bg: "bg-success/10",
        border: "border-success/30",
        text: "text-success",
        shadow: "group-hover:shadow-success/20",
    },
    warning: {
        bg: "bg-warning/10",
        border: "border-warning/30",
        text: "text-warning",
        shadow: "group-hover:shadow-warning/20",
    },
}

export default function LandingPage({ setCurrentPage }: LandingPageProps) {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* ──────────── NAVBAR ──────────── */}
            <nav className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center">
                            <Network size={20} className="text-primary" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-sm">MCP Hub</h2>
                            <p className="text-xs text-muted-foreground">Orchestration</p>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
                        <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
                        <a href="#architecture" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Architecture</a>
                    </div>
                    <button
                        onClick={() => setCurrentPage("dashboard")}
                        className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </nav>

            {/* ──────────── HERO ──────────── */}
            <section className="relative min-h-screen flex items-center justify-center pt-20">
                {/* Animated background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] landing-float" />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] landing-float-delayed" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] landing-pulse-glow" />
                    {/* Grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center landing-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                        <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        <span className="text-sm text-primary font-medium">All systems operational</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text">Multi-Agent </span>
                        <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent landing-gradient-text">
                            DevOps
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text">Orchestration</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                        Automate, monitor, and orchestrate your entire DevOps pipeline with intelligent AI agents.
                        One hub to rule them all.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => setCurrentPage("dashboard")}
                            className="group px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-all hover:shadow-xl hover:shadow-primary/25 flex items-center gap-2"
                        >
                            Go to Dashboard
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <a
                            href="#features"
                            className="px-8 py-3.5 rounded-lg border border-border text-foreground font-semibold text-base hover:bg-card hover:border-accent/50 transition-all flex items-center gap-2"
                        >
                            Explore Features
                        </a>
                    </div>

                    {/* Scroll indicator */}
                    <div className="mt-20 landing-bounce">
                        <ChevronDown size={24} className="mx-auto text-muted-foreground" />
                    </div>
                </div>
            </section>



            {/* ──────────── FEATURES ──────────── */}
            <section id="features" className="py-24 relative">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <p className="text-sm text-accent font-semibold uppercase tracking-wider mb-3">Capabilities</p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            A complete DevOps orchestration suite built for modern infrastructure
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[
                            {
                                icon: GitBranch,
                                title: "Pipeline Orchestration",
                                description: "Visual CI/CD pipeline management with real-time stage tracking and automated rollbacks.",
                                color: "primary",
                            },
                            {
                                icon: Cpu,
                                title: "AI Agents",
                                description: "Intelligent agents that autonomously handle deployments, scaling, and incident response.",
                                color: "accent",
                            },
                            {
                                icon: Activity,
                                title: "System Health",
                                description: "Comprehensive health monitoring across services, infrastructure, and dependencies.",
                                color: "success",
                            },
                            {
                                icon: BarChart3,
                                title: "Real-time Analytics",
                                description: "Live dashboards with job metrics, throughput analysis, and performance trends.",
                                color: "primary",
                            },
                            {
                                icon: Shield,
                                title: "Security Scanning",
                                description: "Built-in SAST, DAST, and dependency scanning integrated into every pipeline.",
                                color: "warning",
                            },
                            {
                                icon: Users,
                                title: "Team Collaboration",
                                description: "Role-based access, shared workflows, and audit trails for DevOps teams.",
                                color: "accent",
                            },
                        ].map((feature) => (
                            <div
                                key={feature.title}
                                className="rounded-lg border border-border bg-card p-6 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10 group cursor-default"
                            >
                                <div className={`w-12 h-12 rounded-lg ${colorClasses[feature.color].bg} ${colorClasses[feature.color].border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <feature.icon size={22} className={colorClasses[feature.color].text} />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ──────────── HOW IT WORKS ──────────── */}
            <section id="how-it-works" className="py-24 bg-card/30 border-y border-border">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="text-sm text-primary font-semibold uppercase tracking-wider mb-3">Workflow</p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Get up and running in three simple steps
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting line */}
                        <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-primary/50 via-accent/50 to-success/50" />

                        {[
                            {
                                step: "01",
                                title: "Configure",
                                description: "Define your pipelines, set up agents, and connect your infrastructure through our intuitive interface.",
                                icon: GitBranch,
                                color: "primary",
                            },
                            {
                                step: "02",
                                title: "Deploy",
                                description: "AI agents autonomously execute your CI/CD pipelines, handle deployments, and manage infrastructure.",
                                icon: Zap,
                                color: "accent",
                            },
                            {
                                step: "03",
                                title: "Monitor",
                                description: "Track everything in real-time with comprehensive dashboards, alerts, and automated incident response.",
                                icon: Activity,
                                color: "success",
                            },
                        ].map((item) => (
                            <div key={item.step} className="relative text-center group">
                                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${colorClasses[item.color].bg} ${colorClasses[item.color].border} flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg ${colorClasses[item.color].shadow} transition-all`}>
                                    <item.icon size={28} className={colorClasses[item.color].text} />
                                </div>
                                <span className={`text-xs font-bold ${colorClasses[item.color].text} uppercase tracking-widest mb-2 block`}>Step {item.step}</span>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ──────────── ARCHITECTURE ──────────── */}
            <section id="architecture" className="py-24 relative">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <p className="text-sm text-accent font-semibold uppercase tracking-wider mb-3">Under the Hood</p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Architecture</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            A centralized hub connecting all your DevOps components
                        </p>
                    </div>

                    {/* Architecture Diagram */}
                    <div className="max-w-4xl mx-auto">
                        {/* Top Layer - Services */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {[
                                { name: "GitHub / GitLab", icon: GitBranch },
                                { name: "Docker / K8s", icon: Server },
                                { name: "Cloud Infra", icon: Activity },
                            ].map((svc) => (
                                <div key={svc.name} className="rounded-lg border border-border bg-card p-4 text-center hover:border-accent/50 transition-all">
                                    <svc.icon size={20} className="text-muted-foreground mx-auto mb-2" />
                                    <p className="text-xs font-medium text-muted-foreground">{svc.name}</p>
                                </div>
                            ))}
                        </div>

                        {/* Connecting Lines Down */}
                        <div className="flex justify-around px-16 mb-3">
                            <div className="w-px h-8 bg-gradient-to-b from-border to-primary/50" />
                            <div className="w-px h-8 bg-gradient-to-b from-border to-primary/50" />
                            <div className="w-px h-8 bg-gradient-to-b from-border to-primary/50" />
                        </div>

                        {/* MCP Hub Center */}
                        <div className="rounded-xl border-2 border-primary/50 bg-gradient-to-br from-primary/10 via-card to-accent/10 p-8 mb-3 text-center hover:shadow-xl hover:shadow-primary/10 transition-all">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/20 border border-primary/50 flex items-center justify-center">
                                <Network size={32} className="text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-1">MCP Orchestration Hub</h3>
                            <p className="text-sm text-muted-foreground">Central control plane for all DevOps operations</p>
                            <div className="flex justify-center gap-3 mt-4">
                                {["Job Queue", "Event Bus", "API Gateway", "Auth"].map((mod) => (
                                    <span key={mod} className="text-xs px-3 py-1 rounded-full bg-muted/50 text-muted-foreground font-medium">{mod}</span>
                                ))}
                            </div>
                        </div>

                        {/* Connecting Lines Down */}
                        <div className="flex justify-around px-16 mb-3">
                            <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-border" />
                            <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-border" />
                            <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-border" />
                        </div>

                        {/* Bottom Layer - Agents */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { name: "Deploy Agent", status: "Active", color: "success" },
                                { name: "Test Agent", status: "Active", color: "success" },
                                { name: "Monitor Agent", status: "Active", color: "success" },
                            ].map((agent) => (
                                <div key={agent.name} className="rounded-lg border border-border bg-card p-4 text-center hover:border-accent/50 transition-all">
                                    <Cpu size={20} className="text-accent mx-auto mb-2" />
                                    <p className="text-sm font-semibold mb-1">{agent.name}</p>
                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-success">
                                        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                                        {agent.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ──────────── CTA FOOTER ──────────── */}
            <section className="py-24 relative">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/8 rounded-full blur-[150px]" />
                </div>
                <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Ready to Orchestrate?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
                        Take control of your DevOps infrastructure with intelligent automation and real-time monitoring.
                    </p>
                    <button
                        onClick={() => setCurrentPage("dashboard")}
                        className="group px-10 py-4 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-bold text-base hover:shadow-2xl hover:shadow-primary/30 transition-all hover:scale-105 flex items-center gap-3 mx-auto"
                    >
                        Launch Dashboard
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </section>

            {/* ──────────── FOOTER ──────────── */}
            <footer className="border-t border-border py-8">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Network size={16} className="text-primary" />
                        <span className="text-sm text-muted-foreground">MCP Orchestration Hub</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Built with Next.js, React, and ❤️ for DevOps teams
                    </p>
                </div>
            </footer>
        </div>
    )
}
