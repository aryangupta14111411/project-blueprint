import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, TrendingUp, Sparkles, Lock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransition, { fadeInUp, staggerContainer } from '@/components/ui/PageTransition';
import FloatingShapes from '@/components/three/FloatingShapes';
import { mockDeals, categoryLabels } from '@/data/deals';

const stats = [
  { value: '$2M+', label: 'Total Savings' },
  { value: '50+', label: 'Partner Deals' },
  { value: '10K+', label: 'Startups Helped' },
];

const features = [
  {
    icon: Zap,
    title: 'Instant Access',
    description: 'Claim deals in seconds with our streamlined verification process.',
  },
  {
    icon: Shield,
    title: 'Verified Partners',
    description: 'All deals come from trusted SaaS partners with proven track records.',
  },
  {
    icon: TrendingUp,
    title: 'Scale Faster',
    description: 'Save thousands on tools and reinvest in growing your startup.',
  },
];

export default function LandingPage() {
  const featuredDeals = mockDeals.slice(0, 6);
  const categories = Object.entries(categoryLabels).slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
          {/* 3D Background */}
          <Suspense fallback={null}>
            <FloatingShapes />
          </Suspense>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-hero-pattern opacity-50" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

          <PageTransition className="container mx-auto px-4 pt-24 pb-16 relative z-10">
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="max-w-4xl mx-auto text-center"
            >
              {/* Badge */}
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-white/90 text-sm mb-8"
              >
                <Sparkles className="w-4 h-4 text-accent" />
                <span>Exclusive deals for startups</span>
              </motion.div>

              {/* Headline */}
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                Save{' '}
                <span className="text-gradient">Thousands</span>
                <br />
                on SaaS Tools
              </motion.h1>

              {/* Subheadline */}
              <motion.p 
                variants={fadeInUp}
                className="text-lg sm:text-xl text-white/70 mb-8 max-w-2xl mx-auto"
              >
                Exclusive discounts and credits on the best software for startups, 
                indie hackers, and growing teams. Stop overpaying, start building.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link to="/deals">
                  <Button size="lg" className="bg-gradient-accent hover:opacity-90 text-white border-0 gap-2 px-8 shadow-glow">
                    Explore Deals
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Get Started Free
                  </Button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div 
                variants={fadeInUp}
                className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-16"
              >
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-white/50 text-sm">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </PageTransition>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Why Startups Choose Us
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We partner with the best SaaS companies to bring you exclusive deals
                you won't find anywhere else.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-gradient-card border border-border hover-lift"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center mb-4 shadow-glow">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Deals by Category
              </h2>
              <p className="text-muted-foreground">
                Find the perfect tools for every aspect of your startup.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map(([key, label], i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={`/deals?category=${key}`}
                    className="block p-4 rounded-xl bg-card border border-border hover:border-accent/50 hover:shadow-glow transition-all text-center group"
                  >
                    <span className="text-sm font-medium group-hover:text-accent transition-colors">
                      {label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Deals Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4"
            >
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                  Featured Deals
                </h2>
                <p className="text-muted-foreground">
                  Top picks from our partner network
                </p>
              </div>
              <Link to="/deals">
                <Button variant="outline" className="gap-2">
                  View All Deals
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredDeals.map((deal, i) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/deals/${deal.id}`}>
                    <div className={`group p-6 rounded-2xl border border-border bg-card hover-lift ${deal.isLocked ? 'relative overflow-hidden' : ''}`}>
                      {deal.isLocked && (
                        <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                          <Lock className="w-3 h-3" />
                          <span>Locked</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center overflow-hidden">
                          <img
                            src={deal.partner.logo}
                            alt={deal.partner.name}
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(deal.partner.name)}&background=14b8a6&color=fff`;
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold group-hover:text-accent transition-colors">
                            {deal.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {deal.partner.name}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {deal.shortDescription}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                          {deal.discount}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {categoryLabels[deal.category]}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern opacity-30" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Save on Your Stack?
              </h2>
              <p className="text-white/70 mb-8 text-lg">
                Join thousands of startups saving money on the tools they need to grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="bg-gradient-accent hover:opacity-90 text-white border-0 gap-2 px-8">
                    <CheckCircle className="w-4 h-4" />
                    Create Free Account
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
