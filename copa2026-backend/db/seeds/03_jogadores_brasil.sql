-- Elenco completo da Seleção Brasileira (selecao_id = 9)
-- 23 jogadores: 3 GK, 8 DEF, 6 MID, 6 FWD

INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
-- Goleiros
(9, 1,  'Ederson Moraes',     'Ederson',    'GK', 'Manchester City',  30, 0),
(9, 12, 'Weverton',           'Weverton',   'GK', 'Palmeiras',        37, 0),
(9, 23, 'Bento',              'Bento',      'GK', 'Al-Qadsiah',       25, 0),
-- Defensores
(9, 2,  'Danilo',             'Danilo',     'DEF', 'Flamengo',        33, 1),
(9, 3,  'Guilherme Arana',    'Arana',      'DEF', 'Atlético MG',     27, 0),
(9, 4,  'Marquinhos',         'Marquinhos', 'DEF', 'PSG',             30, 0),
(9, 5,  'Gabriel Magalhães',  'Gabriel M.', 'DEF', 'Arsenal',         26, 0),
(9, 6,  'Éder Militão',       'Militão',    'DEF', 'Real Madrid',     27, 0),
(9, 13, 'Alex Telles',        'Alex Telles','DEF', 'Sevilla',         32, 0),
(9, 22, 'Vanderson',          'Vanderson',  'DEF', 'Monaco',          23, 0),
(9, 21, 'Bremer',             'Bremer',     'DEF', 'Juventus',        27, 0),
-- Meias
(9, 8,  'Bruno Guimarães',    'Bruno G.',   'MID', 'Newcastle United',26, 0),
(9, 15, 'Casemiro',           'Casemiro',   'MID', 'Manchester United',32, 0),
(9, 16, 'Gerson',             'Gerson',     'MID', 'Flamengo',        27, 0),
(9, 19, 'Lucas Paquetá',      'Paquetá',    'MID', 'West Ham',        27, 0),
(9, 10, 'Neymar Jr.',         'Neymar',     'MID', 'Al-Hilal',        34, 0),
(9, 17, 'Rodrygo',            'Rodrygo',    'MID', 'Real Madrid',     24, 0),
-- Atacantes
(9, 7,  'Vinícius Jr.',       'Vini Jr.',   'FWD', 'Real Madrid',     25, 0),
(9, 9,  'Richarlison',        'Richarlison','FWD', 'Tottenham',       27, 0),
(9, 11, 'Raphinha',           'Raphinha',   'FWD', 'Barcelona',       29, 0),
(9, 14, 'Endrick',            'Endrick',    'FWD', 'Real Madrid',     18, 0),
(9, 18, 'Gabriel Martinelli', 'Martinelli', 'FWD', 'Arsenal',         23, 0),
(9, 20, 'Savinho',            'Savinho',    'FWD', 'Manchester City',  20, 0);
