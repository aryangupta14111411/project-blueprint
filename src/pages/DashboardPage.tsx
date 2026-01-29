import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Shield,
  Sparkles,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/ui/PageTransition';
import { useAuth } from '@/context/AuthContext';
import { categoryLabels } from '@/data/deals';

const statusConfig = {
  pending: {
    icon: Clock,
    label: 'Pending',
    color: 'text-yellow-600',
    bg: 'bg-yellow-100',
  },
  approved: {
    icon: CheckCircle,
    label: 'Approved',
    color: 'text-green-600',
    bg: 'bg-green-100',
  },
  rejected: {
    icon: AlertCircle,
    label: 'Rejected',
    color: 'text-red-600',
    bg: 'bg-red-100',
  },
};

export default function DashboardPage() {
  const { user, claimedDeals, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const totalSavings = claimedDeals
    .filter(cd => cd.status === 'approved')
    .reduce((acc, cd) => {
      const match = cd.deal.discount.match(/\$(\d+(?:,\d+)?)/);
      if (match) {
        return acc + parseInt(match[1].replace(',', ''));
      }
      return acc;
    }, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24">
        <PageTransition>
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center">
                  <LayoutDashboard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
                  <p className="text-muted-foreground">Welcome back, {user.name}</p>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
              <div className="p-6 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-muted-foreground text-sm">Total Claims</span>
                </div>
                <p className="text-3xl font-bold">{claimedDeals.length}</p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-muted-foreground text-sm">Approved</span>
                </div>
                <p className="text-3xl font-bold">
                  {claimedDeals.filter(cd => cd.status === 'approved').length}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <span className="text-muted-foreground text-sm">Pending</span>
                </div>
                <p className="text-3xl font-bold">
                  {claimedDeals.filter(cd => cd.status === 'pending').length}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-accent text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-white/80 text-sm">Est. Savings</span>
                </div>
                <p className="text-3xl font-bold">${totalSavings.toLocaleString()}</p>
              </div>
            </motion.div>

            {/* Verification Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className={`p-6 rounded-2xl border ${
                user.isVerified 
                  ? 'bg-accent/5 border-accent/20' 
                  : 'bg-yellow-50 border-yellow-200'
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    user.isVerified ? 'bg-accent/10' : 'bg-yellow-100'
                  }`}>
                    <Shield className={`w-6 h-6 ${
                      user.isVerified ? 'text-accent' : 'text-yellow-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {user.isVerified ? 'Verified Startup' : 'Verification Pending'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {user.isVerified 
                        ? 'You have access to all exclusive deals'
                        : 'Get verified to unlock exclusive deals'}
                    </p>
                  </div>
                  {!user.isVerified && (
                    <Button variant="outline" size="sm">
                      Get Verified
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Claimed Deals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Your Claimed Deals</h2>
                <Link to="/deals">
                  <Button variant="ghost" size="sm" className="gap-2">
                    Browse More
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {claimedDeals.length === 0 ? (
                <div className="text-center py-16 px-4 rounded-2xl bg-card border border-border">
                  <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No deals claimed yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    Start exploring and claim your first deal to save on premium tools
                  </p>
                  <Link to="/deals">
                    <Button className="bg-gradient-accent hover:opacity-90 text-white border-0">
                      Explore Deals
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {claimedDeals.map((cd, i) => {
                    const status = statusConfig[cd.status];
                    const StatusIcon = status.icon;

                    return (
                      <motion.div
                        key={cd.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-6 rounded-2xl bg-card border border-border hover-lift"
                      >
                        <div className="flex items-center gap-4">
                          {/* Partner Logo */}
                          <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center overflow-hidden shrink-0">
                            <img
                              src={cd.deal.partner.logo}
                              alt={cd.deal.partner.name}
                              className="w-10 h-10 object-contain"
                              onError={(e) => {
                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(cd.deal.partner.name)}&background=14b8a6&color=fff`;
                              }}
                            />
                          </div>

                          {/* Deal Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 flex-wrap">
                              <h3 className="font-semibold">{cd.deal.title}</h3>
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                                <StatusIcon className="w-3 h-3" />
                                {status.label}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {cd.deal.partner.name} • {categoryLabels[cd.deal.category]}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Claimed on {new Date(cd.claimedAt).toLocaleDateString()}
                            </p>
                          </div>

                          {/* Discount + Action */}
                          <div className="text-right shrink-0">
                            <p className="font-semibold text-accent">{cd.deal.discount}</p>
                            <Link to={`/deals/${cd.deal.id}`}>
                              <Button variant="ghost" size="sm" className="gap-1 mt-1">
                                View
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
