CREATE POLICY "Media readable" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Media uploadable" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media');
CREATE POLICY "Media updatable" ON storage.objects FOR UPDATE USING (bucket_id = 'media') WITH CHECK (bucket_id = 'media');
CREATE POLICY "Media deletable" ON storage.objects FOR DELETE USING (bucket_id = 'media');