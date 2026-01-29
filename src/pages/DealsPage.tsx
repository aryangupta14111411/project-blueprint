import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Lock, X, ChevronDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/ui/PageTransition';
import { mockDeals, categoryLabels, filterDeals } from '@/data/deals';
import { DealCategory, AccessLevel } from '@/types';

const accessLevels = [
  { value: 'all', label: 'All Deals' },
  { value: 'unlocked', label: 'Unlocked' },
  { value: 'locked', label: 'Locked' },
];

export default function DealsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<DealCategory | 'all'>(
    (searchParams.get('category') as DealCategory) || 'all'
  );
  const [accessLevel, setAccessLevel] = useState<AccessLevel>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredDeals = useMemo(() => {
    return filterDeals(mockDeals, search, category, accessLevel);
  }, [search, category, accessLevel]);

  const clearFilters = () => {
    setSearch('');
    setCategory('all');
    setAccessLevel('all');
    setSearchParams({});
  };

  const hasActiveFilters = search || category !== 'all' || accessLevel !== 'all';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24">
        <PageTransition>
          <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">Browse Deals</h1>
              <p className="text-muted-foreground">
                Discover exclusive discounts and credits for your startup
              </p>
            </motion.div>

            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8 space-y-4"
            >
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search deals, partners, categories..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12 pr-4 h-12 text-base rounded-xl border-border bg-card"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Filter Toggle + Quick Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>

                {/* Access Level Pills */}
                <div className="flex gap-2">
                  {accessLevels.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setAccessLevel(level.value as AccessLevel)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        accessLevel === level.value
                          ? 'bg-accent text-white shadow-glow'
                          : 'bg-secondary text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>

                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              {/* Category Filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 rounded-xl bg-card border border-border">
                      <h3 className="text-sm font-medium mb-3">Category</h3>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setCategory('all')}
                          className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                            category === 'all'
                              ? 'bg-accent text-white'
                              : 'bg-secondary text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          All Categories
                        </button>
                        {Object.entries(categoryLabels).map(([key, label]) => (
                          <button
                            key={key}
                            onClick={() => setCategory(key as DealCategory)}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                              category === key
                                ? 'bg-accent text-white'
                                : 'bg-secondary text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <p className="text-muted-foreground text-sm">
                Showing {filteredDeals.length} {filteredDeals.length === 1 ? 'deal' : 'deals'}
              </p>
            </motion.div>

            {/* Deals Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredDeals.map((deal, i) => (
                  <motion.div
                    key={deal.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <Link to={`/deals/${deal.id}`}>
                      <div className={`group h-full p-6 rounded-2xl border border-border bg-card hover-lift transition-all ${
                        deal.isLocked ? 'relative' : ''
                      }`}>
                        {deal.isLocked && (
                          <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                            <Lock className="w-3 h-3" />
                            <span>Verification Required</span>
                          </div>
                        )}

                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center overflow-hidden shrink-0">
                            <img
                              src={deal.partner.logo}
                              alt={deal.partner.name}
                              className="w-10 h-10 object-contain"
                              onError={(e) => {
                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(deal.partner.name)}&background=14b8a6&color=fff`;
                              }}
                            />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold truncate group-hover:text-accent transition-colors">
                              {deal.title}
                            </h3>
                            <p className="text-sm text-muted-foreground truncate">
                              {deal.partner.name}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {deal.shortDescription}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                            <Sparkles className="w-3 h-3" />
                            {deal.discount}
                          </span>
                          <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-secondary">
                            {categoryLabels[deal.category]}
                          </span>
                        </div>

                        {deal.originalPrice && (
                          <div className="mt-3 text-xs text-muted-foreground">
                            <span className="line-through">{deal.originalPrice}</span>
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredDeals.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No deals found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
