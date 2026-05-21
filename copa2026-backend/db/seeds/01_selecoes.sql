-- 48 seleções da Copa do Mundo 2026 — Sorteio oficial 05/12/2025
-- Ordem: P1, P2, P3, P4 por grupo → IDs 1-48 sequenciais
-- A:1-4  B:5-8  C:9-12  D:13-16  E:17-20  F:21-24
-- G:25-28  H:29-32  I:33-36  J:37-40  K:41-44  L:45-48

-- GRUPO A — Sedes: México
INSERT INTO selecoes (nome, nome_pt, codigo_iso, bandeira_emoji, confederacao, grupo, pote, eh_cabeca_chave, eh_sede, ranking_fifa) VALUES
('Mexico',         'México',           'MX', '🇲🇽', 'CONCACAF', 'A', 1, 1, 1, 15),
('South Korea',    'Coreia do Sul',    'KR', '🇰🇷', 'AFC',      'A', 2, 0, 0, 22),
('South Africa',   'África do Sul',    'ZA', '🇿🇦', 'CAF',      'A', 3, 0, 0, 66),
('Czech Republic', 'República Tcheca', 'CZ', '🇨🇿', 'UEFA',     'A', 4, 0, 0, 37);

-- GRUPO B — Sedes: Canadá
INSERT INTO selecoes (nome, nome_pt, codigo_iso, bandeira_emoji, confederacao, grupo, pote, eh_cabeca_chave, eh_sede, ranking_fifa) VALUES
('Canada',                   'Canadá',              'CA', '🇨🇦', 'CONCACAF', 'B', 1, 1, 1, 43),
('Switzerland',              'Suíça',               'CH', '🇨🇭', 'UEFA',     'B', 2, 0, 0, 19),
('Qatar',                    'Catar',               'QA', '🇶🇦', 'AFC',      'B', 3, 0, 0, 58),
('Bosnia and Herzegovina',   'Bósnia e Herzegovina','BA', '🇧🇦', 'UEFA',     'B', 4, 0, 0, 55);

-- GRUPO C — Sedes: EUA
INSERT INTO selecoes (nome, nome_pt, codigo_iso, bandeira_emoji, confederacao, grupo, pote, eh_cabeca_chave, eh_sede, ranking_fifa) VALUES
('Brazil',   'Brasil',   'BR',     '🇧🇷',      'CONMEBOL', 'C', 1, 1, 0, 5),
('Morocco',  'Marrocos', 'MA',     '🇲🇦',      'CAF',      'C', 2, 0, 0, 14),
('Scotland', 'Escócia',  'GB-SCT', '🏴󠁧󠁢󠁳󠁣󠁴󠁿', 'UEFA',     'C', 3, 0, 0, 39),
('Haiti',    'Haiti',    'HT',     '🇭🇹',      'CONCACAF', 'C', 4, 0, 0, 83);

-- GRUPO D — Sedes: EUA
INSERT INTO selecoes (nome, nome_pt, codigo_iso, bandeira_emoji, confederacao, grupo, pote, eh_cabeca_chave, eh_sede, ranking_fifa) VALUES
('United States', 'Estados Unidos', 'US', '🇺🇸', 'CONCACAF', 'D', 1, 1, 1, 16),
('Australia',     'Austrália',      'AU', '🇦🇺', 'AFC',      'D', 2, 0, 0, 25),
('Paraguay',      'Paraguai',       'PY', '🇵🇾', 'CONMEBOL', 'D', 3, 0, 0, 62),
('Turkey',        'Turquia',        'TR', '🇹🇷', 'UEFA',     'D', 4, 0, 0, 40);

-- GRUPO E — Sedes: EUA
INSERT INTO selecoes (nome, nome_pt, codigo_iso, bandeira_emoji, confederacao, grupo, pote, eh_cabeca_chave, eh_sede, ranking_fifa) VALUES
('Germany',     'Alemanha',       'DE', '🇩🇪', 'UEFA',     'E', 1, 1, 0, 12),
('Ecuador',     'Equador',        'EC', '🇪🇨', 'CONMEBOL', 'E', 2, 0, 0, 41),
('Ivory Coast', 'Costa do Marfim','CI', '🇨🇮', 'CAF',      'E', 3, 0, 0, 48),
('Curacao',     'Curaçao',        'CW', '🇨🇼', 'CONCACAF', 'E', 4, 0, 0, 90);

-- GRUPO F — Sedes: EUA
INSERT INTO selecoes (nome, nome_pt, codigo_iso, bandeira_emoji, confederacao, grupo, pote, eh_cabeca_chave, eh_sede, ranking_fifa) VALUES
('Netherlands', 'Holanda', 'NL', '🇳🇱', 'UEFA', 'F', 1, 1, 0, 7),
('Japan',       'Japão',   'JP', '🇯🇵', 'AFC',  'F', 2, 0, 0, 17),
('Tunisia',     'Tunísia', 'TN', '🇹🇳', 'CAF',  'F', 3, 0, 0, 34),
('Sweden',      'Suécia',  'SE', '🇸🇪', 'UEFA', 'F', 4, 0, 0, 24);

-- GRUPO G — Sedes: EUA
INSERT INTO selecoes (nome, nome_pt, codigo_iso, bandeira_emoji, confederacao, grupo, pote, eh_cabeca_chave, eh_sede, ranking_fifa) VALUES
('Belgium',     'Bélgica',      'BE', '🇧🇪', 'UEFA', 'G', 1, 1, 0, 3),
('Iran',        'Irã',          'IR', '🇮🇷', 'AFC',  'G', 2, 0, 0, 21),
('Egypt',       'Egito',        'EG', '🇪🇬', 'CAF',  'G', 3, 0, 0, 35),
('New Zealand', 'Nova Zelândia','NZ', '🇳🇿', 'OFC',  'G', 4, 0, 0, 97);

-- GRUPO H — Sedes: EUA
INSERT INTO selecoes (nome, nome_pt, codigo_iso, bandeira_emoji, confederacao, grupo, pote, eh_cabeca_chave, eh_sede, ranking_fifa) VALUES
('Spain',        'Espanha',       'ES', '🇪🇸', 'UEFA',     'H', 1, 1, 0, 8),
('Uruguay',      'Uruguai',       'UY', '🇺🇾', 'CONMEBOL', 'H', 2, 0, 0, 18),
('Saudi Arabia', 'Arábia Saudita','SA', '🇸🇦', 'AFC',      'H', 3, 0, 0, 53),
('Cape Verde',   'Cabo Verde',    'CV', '🇨🇻', 'CAF',      'H', 4, 0, 0, 73);

-- GRUPO I — Sedes: EUA/Canadá
INSERT INTO selecoes (nome, nome_pt, codigo_iso, bandeira_emoji, confederacao, grupo, pote, eh_cabeca_chave, eh_sede, ranking_fifa) VALUES
('France',  'França',   'FR', '🇫🇷', 'UEFA', 'I', 1, 1, 0, 2),
('Senegal', 'Senegal',  'SN', '🇸🇳', 'CAF',  'I', 2, 0, 0, 20),
('Norway',  'Noruega',  'NO', '🇳🇴', 'UEFA', 'I', 3, 0, 0, 30),
('Iraq',    'Iraque',   'IQ', '🇮🇶', 'AFC',  'I', 4, 0, 0, 63);

-- GRUPO J — Sedes: EUA
INSERT INTO selecoes (nome, nome_pt, codigo_iso, bandeira_emoji, confederacao, grupo, pote, eh_cabeca_chave, eh_sede, ranking_fifa) VALUES
('Argentina', 'Argentina', 'AR', '🇦🇷', 'CONMEBOL', 'J', 1, 1, 0, 1),
('Austria',   'Áustria',   'AT', '🇦🇹', 'UEFA',     'J', 2, 0, 0, 29),
('Algeria',   'Argélia',   'DZ', '🇩🇿', 'CAF',      'J', 3, 0, 0, 52),
('Jordan',    'Jordânia',  'JO', '🇯🇴', 'AFC',      'J', 4, 0, 0, 87);

-- GRUPO K — Sedes: EUA
INSERT INTO selecoes (nome, nome_pt, codigo_iso, bandeira_emoji, confederacao, grupo, pote, eh_cabeca_chave, eh_sede, ranking_fifa) VALUES
('Portugal',  'Portugal',          'PT', '🇵🇹', 'UEFA',     'K', 1, 1, 0, 6),
('Colombia',  'Colômbia',          'CO', '🇨🇴', 'CONMEBOL', 'K', 2, 0, 0, 26),
('Uzbekistan','Uzbequistão',       'UZ', '🇺🇿', 'AFC',      'K', 3, 0, 0, 74),
('DR Congo',  'Rep. Dem. do Congo','CD', '🇨🇩', 'CAF',      'K', 4, 0, 0, 56);

-- GRUPO L — Sedes: EUA/Canadá
INSERT INTO selecoes (nome, nome_pt, codigo_iso, bandeira_emoji, confederacao, grupo, pote, eh_cabeca_chave, eh_sede, ranking_fifa) VALUES
('England', 'Inglaterra', 'GB',  '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'UEFA',     'L', 1, 1, 0, 4),
('Croatia', 'Croácia',    'HR',  '🇭🇷',      'UEFA',     'L', 2, 0, 0, 10),
('Panama',  'Panamá',     'PA',  '🇵🇦',      'CONCACAF', 'L', 3, 0, 0, 77),
('Ghana',   'Gana',       'GH',  '🇬🇭',      'CAF',      'L', 4, 0, 0, 60);
