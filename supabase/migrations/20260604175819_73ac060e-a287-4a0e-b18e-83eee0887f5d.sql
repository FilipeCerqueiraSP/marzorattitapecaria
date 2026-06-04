
CREATE POLICY "Public read catalogo"
ON storage.objects FOR SELECT
USING (bucket_id = 'catalogo');

CREATE POLICY "Authenticated upload catalogo"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'catalogo');

CREATE POLICY "Authenticated update catalogo"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'catalogo');

CREATE POLICY "Authenticated delete catalogo"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'catalogo');
