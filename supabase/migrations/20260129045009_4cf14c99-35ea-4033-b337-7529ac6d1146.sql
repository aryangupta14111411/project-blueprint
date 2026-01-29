-- Create enum for deal categories
CREATE TYPE public.deal_category AS ENUM ('cloud', 'marketing', 'analytics', 'productivity', 'design', 'developer-tools', 'communication', 'finance');

-- Create enum for claim status
CREATE TYPE public.claim_status AS ENUM ('pending', 'approved', 'rejected');

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create deals table
CREATE TABLE public.deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  partner_name TEXT NOT NULL,
  partner_logo TEXT NOT NULL,
  partner_website TEXT NOT NULL,
  category deal_category NOT NULL,
  discount TEXT NOT NULL,
  original_price TEXT,
  is_locked BOOLEAN DEFAULT false,
  eligibility_rules TEXT[] DEFAULT '{}',
  claim_instructions TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  total_claims INTEGER DEFAULT 0,
  max_claims INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create claims table
CREATE TABLE public.claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  deal_id UUID REFERENCES public.deals(id) ON DELETE CASCADE NOT NULL,
  status claim_status DEFAULT 'pending',
  claimed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  approved_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, deal_id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Deals policies (public read, admin write)
CREATE POLICY "Anyone can view deals"
  ON public.deals FOR SELECT
  USING (true);

-- Claims policies
CREATE POLICY "Users can view their own claims"
  ON public.claims FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own claims"
  ON public.claims FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

-- Trigger to auto-create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to increment claim count
CREATE OR REPLACE FUNCTION public.increment_claim_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.deals
  SET total_claims = total_claims + 1
  WHERE id = NEW.deal_id;
  RETURN NEW;
END;
$$;

-- Trigger to update claim count
CREATE TRIGGER on_claim_created
  AFTER INSERT ON public.claims
  FOR EACH ROW EXECUTE FUNCTION public.increment_claim_count();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Timestamp triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_deals_updated_at
  BEFORE UPDATE ON public.deals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();