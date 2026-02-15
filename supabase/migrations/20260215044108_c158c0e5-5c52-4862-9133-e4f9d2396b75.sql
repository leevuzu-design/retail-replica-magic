-- Add validation trigger for order note length (using trigger instead of CHECK for flexibility)
CREATE OR REPLACE FUNCTION public.validate_order_note_length()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF length(NEW.note) > 500 THEN
    RAISE EXCEPTION 'Order note exceeds maximum length of 500 characters';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER check_order_note_length
BEFORE INSERT OR UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.validate_order_note_length();