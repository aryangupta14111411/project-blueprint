import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ExternalLink, 
  Lock, 
  CheckCircle, 
  AlertCircle, 
  Sparkles,
  Clock,
  Users,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/ui/PageTransition';
import { getDealById, categoryLabels } from '@/data/deals';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function DealDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, claimDeal, hasClaimed } = useAuth();
  const [isClaiming, setIsClaiming] = useState(false);

  const deal = getDealById(id!);
  const alreadyClaimed = hasClaimed(id!);
  const canClaim = !deal?.isLocked || user?.isVerified;

  if (!deal) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Deal not found</h1>
            <p className="text-muted-foreground mb-6">
              The deal you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/deals">
              <Button>Browse All Deals</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleClaim = async () => {
    if (!user) {
      toast.error('Please log in to claim this deal');
      navigate('/login');
      return;
    }

    if (deal.isLocked && !user.isVerified) {
      toast.error('You need to be verified to claim this deal');
      return;
    }

    setIsClaiming(true);
    const success = await claimDeal(deal.id);
    setIsClaiming(false);

    if (success) {
      toast.success('Deal claimed successfully!', {
        description: 'Check your dashboard for status updates.',
      });
    } else {
      toast.error('Failed to claim deal');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24">
        <PageTransition>
          <div className="container mx-auto px-4 py-8">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link to="/deals">
                <Button variant="ghost" className="gap-2 -ml-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Deals
                </Button>
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-2 space-y-8"
              >
                {/* Header */}
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center overflow-hidden shrink-0">
                    <img
                      src={deal.partner.logo}
                      alt={deal.partner.name}
                      className="w-14 h-14 object-contain"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(deal.partner.name)}&background=14b8a6&color=fff&size=128`;
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full bg-secondary text-sm">
                        {categoryLabels[deal.category]}
                      </span>
                      {deal.isLocked && (
                        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">
                          <Lock className="w-3 h-3" />
                          Verification Required
                        </span>
                      )}
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                      {deal.title}
                    </h1>
                    <p className="text-muted-foreground">
                      by {deal.partner.name}
                    </p>
                  </div>
                </div>

                {/* Discount Banner */}
                <div className="p-6 rounded-2xl bg-gradient-accent text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="w-6 h-6" />
                    <span className="text-xl font-bold">{deal.discount}</span>
                  </div>
                  {deal.originalPrice && (
                    <p className="text-white/80">
                      Originally <span className="line-through">{deal.originalPrice}</span>
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">About This Deal</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {deal.description}
                  </p>
                </div>

                {/* Eligibility */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Eligibility Requirements</h2>
                  <ul className="space-y-3">
                    {deal.eligibilityRules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* How to Claim */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">How to Claim</h2>
                  <p className="text-muted-foreground">
                    {deal.claimInstructions}
                  </p>
                </div>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                {/* Claim Card */}
                <div className="p-6 rounded-2xl bg-card border border-border sticky top-24">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 rounded-xl bg-secondary">
                      <Users className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-lg font-bold">{deal.totalClaims.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Claims</p>
                    </div>
                    {deal.maxClaims && (
                      <div className="text-center p-3 rounded-xl bg-secondary">
                        <Clock className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-lg font-bold">
                          {((deal.totalClaims / deal.maxClaims) * 100).toFixed(0)}%
                        </p>
                        <p className="text-xs text-muted-foreground">Claimed</p>
                      </div>
                    )}
                  </div>

                  {/* Verification Warning */}
                  {deal.isLocked && user && !user.isVerified && (
                    <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 mb-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Verification Required</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            This deal is only available to verified startups.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Claim Button */}
                  {alreadyClaimed ? (
                    <div className="p-4 rounded-xl bg-accent/10 text-center">
                      <CheckCircle className="w-6 h-6 text-accent mx-auto mb-2" />
                      <p className="font-medium">Deal Claimed!</p>
                      <Link to="/dashboard" className="text-sm text-accent hover:underline">
                        View in Dashboard →
                      </Link>
                    </div>
                  ) : (
                    <Button
                      onClick={handleClaim}
                      disabled={isClaiming || (deal.isLocked && !canClaim)}
                      className="w-full h-12 bg-gradient-accent hover:opacity-90 text-white border-0 gap-2"
                    >
                      {isClaiming ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Claiming...
                        </>
                      ) : deal.isLocked && !canClaim ? (
                        <>
                          <Lock className="w-4 h-4" />
                          Verification Required
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Claim This Deal
                        </>
                      )}
                    </Button>
                  )}

                  {!user && (
                    <p className="text-xs text-muted-foreground text-center mt-3">
                      <Link to="/login" className="text-accent hover:underline">Log in</Link> to claim this deal
                    </p>
                  )}

                  {/* Partner Link */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <a
                      href={deal.partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit {deal.partner.name}
                    </a>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="p-4 rounded-xl bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm font-medium">Verified Partner</p>
                      <p className="text-xs text-muted-foreground">
                        This deal is from a trusted partner
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
