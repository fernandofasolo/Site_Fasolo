-- Elenco oficial da Seleção Brasileira (selecao_id = 9)
-- Convocação de Carlo Ancelotti para a Copa do Mundo 2026 — 26 jogadores
-- Numeração oficial divulgada pela CBF. Capitão: Marquinhos (4).
-- Idade deixada como NULL (não divulgada junto à convocação).

INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
-- Goleiros
(9, 1,  'Alisson Becker',     'Alisson',    'GK', 'Liverpool',         NULL, 0),
(9, 12, 'Weverton',           'Weverton',   'GK', 'Grêmio',            NULL, 0),
(9, 23, 'Ederson Moraes',     'Ederson',    'GK', 'Fenerbahçe',        NULL, 0),
-- Defensores
(9, 4,  'Marquinhos',         'Marquinhos', 'DEF', 'PSG',              NULL, 1),
(9, 3,  'Gabriel Magalhães',  'Gabriel M.', 'DEF', 'Arsenal',          NULL, 0),
(9, 14, 'Bremer',             'Bremer',     'DEF', 'Juventus',         NULL, 0),
(9, 24, 'Roger Ibañez',       'Ibañez',     'DEF', 'Al-Ahli',          NULL, 0),
(9, 15, 'Léo Pereira',        'Léo Pereira','DEF', 'Flamengo',         NULL, 0),
(9, 2,  'Wesley França',      'Wesley',     'DEF', 'Roma',             NULL, 0),
(9, 6,  'Alex Sandro',        'Alex Sandro','DEF', 'Flamengo',         NULL, 0),
(9, 16, 'Douglas Santos',     'D. Santos',  'DEF', 'Zenit',            NULL, 0),
(9, 13, 'Danilo',             'Danilo',     'DEF', 'Flamengo',         NULL, 0),
-- Meias
(9, 5,  'Casemiro',           'Casemiro',   'MID', 'Manchester United',NULL, 0),
(9, 8,  'Bruno Guimarães',    'Bruno G.',   'MID', 'Newcastle United', NULL, 0),
(9, 18, 'Danilo',             'Danilo (B)', 'MID', 'Botafogo',         NULL, 0),
(9, 20, 'Lucas Paquetá',      'Paquetá',    'MID', 'West Ham',         NULL, 0),
(9, 17, 'Fabinho',            'Fabinho',    'MID', 'Al-Ittihad',       NULL, 0),
-- Atacantes
(9, 11, 'Raphinha',           'Raphinha',   'FWD', 'Barcelona',        NULL, 0),
(9, 7,  'Vinícius Jr.',       'Vini Jr.',   'FWD', 'Real Madrid',      NULL, 0),
(9, 21, 'Luiz Henrique',      'Luiz H.',    'FWD', 'Zenit',            NULL, 0),
(9, 22, 'Gabriel Martinelli', 'Martinelli', 'FWD', 'Arsenal',          NULL, 0),
(9, 10, 'Neymar Jr.',         'Neymar',     'FWD', 'Santos',           NULL, 0),
(9, 19, 'Endrick',            'Endrick',    'FWD', 'Real Madrid',       NULL, 0),
(9, 9,  'Matheus Cunha',      'M. Cunha',   'FWD', 'Manchester United',NULL, 0),
(9, 26, 'Rayan',              'Rayan',      'FWD', 'Bournemouth',      NULL, 0),
(9, 25, 'Igor Thiago',        'Igor Thiago','FWD', 'Brentford',        NULL, 0);
