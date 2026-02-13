ALTER TABLE public.profiles
ADD COLUMN birthday date DEFAULT NULL,
ADD COLUMN gender text DEFAULT NULL;