-- Clear old achievements to avoid duplicates if re-running
DELETE FROM public.achievements;

-- Insert new achievements
INSERT INTO public.achievements (title, description, criteria_type, criteria_value, icon_url) VALUES
('First Step', 'Logged your first meal with the Eat-in-Order protocol.', 'streak', 1, '🪶'),
('Building Momentum', '3-day streak: your body is adapting to the Eat-in-Order rhythm.', 'streak', 3, '🌱'),
('On a Roll', '7-day streak: gut microbiome adapting, GLP-1 response strengthening.', 'streak', 7, '🌿'),
('Two Weeks Strong', '14-day streak: metabolic reset in progress — your body anticipates the sequence.', 'streak', 14, '🌻'),
('Month of Momentum', '30-day streak: measurable improvement in metabolic flexibility.', 'streak', 30, '🏔️'),
('GLP-1 Champion', '60-day streak: natural GLP-1 response is now significantly enhanced.', 'streak', 60, '🏅'),
('Metabolic Master', '90-day streak: fundamental metabolic rewiring — sustainable health achieved.', 'streak', 90, '🌟'),
('Century Club', '100-day streak: elite metabolic health — hormone system at peak efficiency.', 'streak', 100, '🔥'),
('GLP-1 Explorer', 'Logged 10 meals — beginning to identify personal metabolic patterns.', 'total_logs', 10, '🔍'),
('Food Scanner Pro', 'Scanned 50 meals — rich dataset with clear GLP-1 improvement trends.', 'total_logs', 50, '📸'),
('Meal Moment Legend', 'Completed 100 Meal Moments — over 150 hours of metabolic optimization.', 'total_logs', 100, '⚡'),
('Fiber First', 'Achieved first 80+ GLP-1 Score — meal is well-optimized for natural GLP-1.', 'best_glp1_score', 80, '🥗'),
('Protein Powerhouse', 'Achieved first 90+ GLP-1 Score — exceptional metabolic meal alignment.', 'best_glp1_score', 90, '💪'),
('Eat-in-Order Expert', 'Achieved 95+ GLP-1 Score — elite-level metabolic meal optimization.', 'best_glp1_score', 95, '👑'),
('Perfect Plate', 'Achieved a perfect 100 GLP-1 Score — flawless metabolic meal.', 'best_glp1_score', 100, '💎');
