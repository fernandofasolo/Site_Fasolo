-- Elencos simplificados das demais 47 seleções (5 jogadores representativos cada)
-- selecao_id segue a ordem de inserção do seed 01 (sorteio 05/12/2025)

-- Argentina (37)
INSERT INTO jogadores (selecao_id,numero,nome,nome_curto,posicao,clube,idade,eh_capitao) VALUES
(37,1,'Emiliano Martínez','Dibu',     'GK','Aston Villa',31,0),
(37,10,'Lionel Messi',   'Messi',     'MID','Inter Miami',38,1),
(37,11,'Lautaro Martínez','Lautaro',  'FWD','Internazionale',26,0),
(37,4,'Lisandro Martínez','L. Martínez','DEF','Manchester United',26,0),
(37,8,'Rodrigo De Paul', 'De Paul',   'MID','Atlético Madrid',30,0);

-- Croácia (46)
INSERT INTO jogadores (selecao_id,numero,nome,nome_curto,posicao,clube,idade,eh_capitao) VALUES
(46,1,'Dominik Livaković','Livaković','GK','Fenerbahçe',29,0),
(46,10,'Luka Modrić',   'Modrić',    'MID','Al-Qadsiah',40,1),
(46,9,'Andrej Kramarić','Kramarić',  'FWD','Hoffenheim',33,0),
(46,6,'Josip Šutalo',   'Šutalo',    'DEF','Ajax',24,0),
(46,8,'Mateo Kovačić',  'Kovačić',   'MID','Manchester City',30,0);

-- Marrocos (10)
INSERT INTO jogadores (selecao_id,numero,nome,nome_curto,posicao,clube,idade,eh_capitao) VALUES
(10,1,'Yassine Bounou', 'Bono',      'GK','Al-Hilal',33,0),
(10,6,'Romain Saïss',   'Saïss',     'DEF','Besiktas',34,1),
(10,17,'Hakim Ziyech',  'Ziyech',    'MID','Galatasaray',32,0),
(10,9,'Youssef En-Nesyri','En-Nesyri','FWD','Fenerbahçe',27,0),
(10,4,'Nayef Aguerd',   'Aguerd',    'DEF','West Ham',27,0);

-- França (33)
INSERT INTO jogadores (selecao_id,numero,nome,nome_curto,posicao,clube,idade,eh_capitao) VALUES
(33,1,'Mike Maignan',   'Maignan',   'GK','AC Milan',29,0),
(33,10,'Kylian Mbappé', 'Mbappé',    'FWD','Real Madrid',27,1),
(33,9,'Olivier Giroud', 'Giroud',    'FWD','LAFC',39,0),
(33,5,'Jules Koundé',   'Koundé',    'DEF','Barcelona',26,0),
(33,8,'Aurélien Tchouaméni','Tchouaméni','MID','Real Madrid',24,0);

-- Portugal (41)
INSERT INTO jogadores (selecao_id,numero,nome,nome_curto,posicao,clube,idade,eh_capitao) VALUES
(41,1,'Diogo Costa',    'D. Costa',  'GK','Porto',25,0),
(41,7,'Cristiano Ronaldo','CR7',     'FWD','Al-Nassr',41,1),
(41,8,'Bruno Fernandes', 'Bruno F.', 'MID','Manchester United',31,0),
(41,11,'Rafael Leão',   'Leão',      'FWD','AC Milan',25,0),
(41,6,'Rúben Dias',     'R. Dias',   'DEF','Manchester City',27,0);

-- Espanha (29)
INSERT INTO jogadores (selecao_id,numero,nome,nome_curto,posicao,clube,idade,eh_capitao) VALUES
(29,1,'Unai Simón',     'U. Simón',  'GK','Athletic Bilbao',27,0),
(29,8,'Pedri',          'Pedri',     'MID','Barcelona',23,0),
(29,10,'Gavi',          'Gavi',      'MID','Barcelona',22,0),
(29,9,'Álvaro Morata',  'Morata',    'FWD','AC Milan',32,1),
(29,3,'Alejandro Balde','Balde',     'DEF','Barcelona',21,0);

-- Alemanha (17)
INSERT INTO jogadores (selecao_id,numero,nome,nome_curto,posicao,clube,idade,eh_capitao) VALUES
(17,1,'Manuel Neuer',   'Neuer',     'GK','Bayern München',40,1),
(17,13,'Thomas Müller', 'Müller',    'FWD','Bayern München',36,0),
(17,6,'Joshua Kimmich', 'Kimmich',   'MID','Bayern München',29,0),
(17,9,'Kai Havertz',    'Havertz',   'FWD','Arsenal',26,0),
(17,4,'Jonathan Tah',   'Tah',       'DEF','Bayern München',29,0);

-- Inglaterra (45)
INSERT INTO jogadores (selecao_id,numero,nome,nome_curto,posicao,clube,idade,eh_capitao) VALUES
(45,1,'Jordan Pickford','Pickford',  'GK','Everton',32,0),
(45,10,'Jude Bellingham','Bellingham','MID','Real Madrid',22,0),
(45,9,'Harry Kane',     'Kane',      'FWD','Bayern München',32,1),
(45,7,'Bukayo Saka',    'Saka',      'FWD','Arsenal',24,0),
(45,6,'Marc Guéhi',     'Guéhi',     'DEF','Crystal Palace',24,0);

-- Bélgica (25)
INSERT INTO jogadores (selecao_id,numero,nome,nome_curto,posicao,clube,idade,eh_capitao) VALUES
(25,1,'Koen Casteels',  'Casteels',  'GK','Wolfsburg',32,0),
(25,7,'Kevin De Bruyne','KDB',       'MID','Manchester City',33,1),
(25,9,'Romelu Lukaku',  'Lukaku',    'FWD','Napoli',31,0),
(25,11,'Leandro Trossard','Trossard','FWD','Arsenal',29,0),
(25,5,'Jan Vertonghen', 'Vertonghen','DEF','Anderlecht',37,0);

-- Holanda (21)
INSERT INTO jogadores (selecao_id,numero,nome,nome_curto,posicao,clube,idade,eh_capitao) VALUES
(21,1,'Bart Verbruggen','Verbruggen','GK','Brighton',22,0),
(21,10,'Memphis Depay', 'Memphis',   'FWD','Atletico Madrid',30,0),
(21,9,'Wout Weghorst',  'Weghorst',  'FWD','Burnley',32,0),
(21,6,'Virgil van Dijk','Van Dijk',  'DEF','Liverpool',33,1),
(21,8,'Frenkie de Jong','F. de Jong','MID','Barcelona',27,0);

-- Irã (26)
INSERT INTO jogadores (selecao_id,numero,nome,nome_curto,posicao,clube,idade,eh_capitao) VALUES
(26,1,'Alireza Beiranvand','Beiranvand','GK','Persepolis',32,0),
(26,9,'Sardar Azmoun', 'Azmoun',    'FWD','Bayer Leverkusen',30,1),
(26,11,'Mehdi Taremi',  'Taremi',   'FWD','Internazionale',32,0),
(26,6,'Majid Hosseini', 'Hosseini', 'DEF','Trabzonspor',27,0),
(26,8,'Ahmad Noorollahi','Noorollahi','MID','Persepolis',30,0);

-- EUA (13)
INSERT INTO jogadores (selecao_id,numero,nome,nome_curto,posicao,clube,idade,eh_capitao) VALUES
(13,1,'Matt Turner',    'Turner',    'GK','Crystal Palace',30,0),
(13,10,'Christian Pulisic','Pulisic', 'MID','AC Milan',26,1),
(13,9,'Josh Sargent',   'Sargent',   'FWD','Norwich City',24,0),
(13,7,'Gio Reyna',      'Reyna',     'MID','Nottm Forest',22,0),
(13,5,'Tyler Adams',    'Adams',     'MID','Bournemouth',25,0);

-- Japão (22)
INSERT INTO jogadores (selecao_id,numero,nome,nome_curto,posicao,clube,idade,eh_capitao) VALUES
(22,1,'Shuichi Gonda',  'Gonda',     'GK','Shimizu',35,0),
(22,10,'Shunsuke Mito', 'Mito',      'FWD','Kashiwa Reysol',28,0),
(22,9,'Ayase Ueda',     'Ueda',      'FWD','Feyenoord',26,0),
(22,5,'Takehiro Tomiyasu','Tomiyasu','DEF','Arsenal',25,0),
(22,8,'Wataru Endo',    'Endo',       'MID','Liverpool',31,1);

-- Coreia do Sul (2)
INSERT INTO jogadores (selecao_id,numero,nome,nome_curto,posicao,clube,idade,eh_capitao) VALUES
(2,1,'Kim Seung-gyu',   'K. Seung-gyu','GK','Vissel Kobe',34,0),
(2,7,'Son Heung-min',   'Son',         'FWD','Tottenham',32,1),
(2,9,'Cho Gue-sung',    'Cho',         'FWD','Jeonbuk',26,0),
(2,5,'Kim Min-jae',     'K. Min-jae',  'DEF','Bayern München',28,0),
(2,10,'Lee Jae-sung',   'Lee',         'MID','Mainz',32,0);

-- Uruguai (30)
INSERT INTO jogadores (selecao_id,numero,nome,nome_curto,posicao,clube,idade,eh_capitao) VALUES
(30,1,'Sergio Rochet',  'Rochet',    'GK','Nacional',29,0),
(30,9,'Darwin Núñez',   'Núñez',     'FWD','Liverpool',25,0),
(30,7,'Facundo Pellistri','Pellistri','FWD','Manchester United',23,0),
(30,3,'Mathías Olivera','Olivera',   'DEF','Napoli',26,0),
(30,10,'Federico Valverde','Valverde','MID','Real Madrid',26,1);

-- Senegal (34)
INSERT INTO jogadores (selecao_id,numero,nome,nome_curto,posicao,clube,idade,eh_capitao) VALUES
(34,1,'Edouard Mendy',  'E. Mendy',  'GK','Al-Ahly',32,0),
(34,10,'Sadio Mané',    'Mané',      'FWD','Al-Nassr',32,1),
(34,9,'Nicolas Jackson','Jackson',   'FWD','Chelsea',23,0),
(34,5,'Kalidou Koulibaly','Koulibaly','DEF','Al-Hilal',33,0),
(34,8,'Pape Matar Sarr','P. Sarr',   'MID','Tottenham',22,0);

-- México (1)
INSERT INTO jogadores (selecao_id,numero,nome,nome_curto,posicao,clube,idade,eh_capitao) VALUES
(1,1,'Guillermo Ochoa', 'Ochoa',     'GK','América',38,1),
(1,10,'Hirving Lozano', 'Chucky',    'FWD','PSV',29,0),
(1,9,'Raúl Jiménez',    'Jiménez',   'FWD','Fulham',33,0),
(1,6,'Edson Álvarez',   'Álvarez',   'MID','West Ham',26,0),
(1,4,'César Montes',    'C. Montes', 'DEF','Espanyol',27,0);
