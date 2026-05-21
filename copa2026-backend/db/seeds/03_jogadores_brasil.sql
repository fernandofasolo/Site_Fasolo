-- Elenco completo da Seleção Brasileira (selecao_id = 25)
-- 23 jogadores: 3 GK, 8 DEF, 6 MID, 6 FWD

INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
-- Goleiros
(25, 1,  'Ederson Moraes',     'Ederson',    'GK', 'Manchester City',  30, 0),
(25, 12, 'Weverton',           'Weverton',   'GK', 'Palmeiras',        37, 0),
(25, 23, 'Bento',              'Bento',      'GK', 'Al-Qadsiah',       25, 0),
-- Defensores
(25, 2,  'Danilo',             'Danilo',     'DEF', 'Flamengo',        33, 1),
(25, 3,  'Guilherme Arana',    'Arana',      'DEF', 'Atlético MG',     27, 0),
(25, 4,  'Marquinhos',         'Marquinhos', 'DEF', 'PSG',             30, 0),
(25, 5,  'Gabriel Magalhães',  'Gabriel M.', 'DEF', 'Arsenal',         26, 0),
(25, 6,  'Éder Militão',       'Militão',    'DEF', 'Real Madrid',     27, 0),
(25, 13, 'Alex Telles',        'Alex Telles','DEF', 'Sevilla',         32, 0),
(25, 22, 'Vanderson',          'Vanderson',  'DEF', 'Monaco',          23, 0),
(25, 2,  'Bremer',             'Bremer',     'DEF', 'Juventus',        27, 0),
-- Meias
(25, 8,  'Bruno Guimarães',    'Bruno G.',   'MID', 'Newcastle United',26, 0),
(25, 15, 'Casemiro',           'Casemiro',   'MID', 'Manchester United',32, 0),
(25, 16, 'Gerson',             'Gerson',     'MID', 'Flamengo',        27, 0),
(25, 19, 'Lucas Paquetá',      'Paquetá',    'MID', 'West Ham',        27, 0),
(25, 10, 'Neymar Jr.',         'Neymar',     'MID', 'Al-Hilal',        34, 0),
(25, 17, 'Rodrygo',            'Rodrygo',    'MID', 'Real Madrid',     24, 0),
-- Atacantes
(25, 7,  'Vinícius Jr.',       'Vini Jr.',   'FWD', 'Real Madrid',     25, 0),
(25, 9,  'Richarlison',        'Richarlison','FWD', 'Tottenham',       27, 0),
(25, 11, 'Raphinha',           'Raphinha',   'FWD', 'Barcelona',       29, 0),
(25, 14, 'Endrick',            'Endrick',    'FWD', 'Real Madrid',     18, 0),
(25, 18, 'Gabriel Martinelli', 'Martinelli', 'FWD', 'Arsenal',         23, 0),
(25, 20, 'Savinho',            'Savinho',    'FWD', 'Manchester City',  20, 0);
