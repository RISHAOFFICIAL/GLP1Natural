-- Add index for full_name to improve search performance
CREATE INDEX IF NOT EXISTS profiles_full_name_idx ON public.profiles USING gin (full_name gin_trgm_ops);
-- Or just a simple btree if we are only doing prefix/substring with ilike
-- Actually, for substring ilike, gin_trgm_ops is better, but requires pg_trgm extension.
-- Let's stick to a simple btree index for now as I'm not sure if pg_trgm is enabled.
CREATE INDEX IF NOT EXISTS profiles_full_name_idx ON public.profiles (full_name);
CREATE INDEX IF NOT EXISTS profiles_username_idx ON public.profiles (username);
