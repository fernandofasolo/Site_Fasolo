-- 72 jogos da fase de grupos — horários oficiais FIFA (Wikipedia)
-- UTC calculado a partir do horário local + fuso da sede:
--   EDT = UTC-4  |  CDT (EUA/MX) = UTC-5  |  CDT (MX) = UTC-6  |  PDT = UTC-7
-- IDs das seleções (sorteio oficial 05/12/2025):
-- A:  1=México       2=Coreia Sul   3=África do Sul 4=Rep.Tcheca
-- B:  5=Canadá       6=Suíça        7=Catar         8=Bósnia
-- C:  9=Brasil      10=Marrocos    11=Escócia      12=Haiti
-- D: 13=EUA         14=Austrália   15=Paraguai     16=Turquia
-- E: 17=Alemanha    18=Equador     19=Costa Marfim 20=Curaçao
-- F: 21=Holanda     22=Japão       23=Tunísia      24=Suécia
-- G: 25=Bélgica     26=Irã         27=Egito        28=Nova Zelândia
-- H: 29=Espanha     30=Uruguai     31=Arábia Saudita 32=Cabo Verde
-- I: 33=França      34=Senegal     35=Noruega      36=Iraque
-- J: 37=Argentina   38=Áustria     39=Argélia      40=Jordânia
-- K: 41=Portugal    42=Colômbia    43=Uzbequistão  44=Congo RD
-- L: 45=Inglaterra  46=Croácia     47=Panamá       48=Gana

-- =========================================================
-- GRUPO A — México(1) Coreia(2) África do Sul(3) Rep.Tcheca(4)
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','A',1, 1, 3,'2026-06-11T19:00:00','Estádio Azteca',       'Cidade do México','México',2,0,'encerrado'),
('grupo','A',1, 2, 4,'2026-06-12T02:00:00','Estadio Akron',        'Guadalajara',     'México',2,1,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','A',2, 4, 3,'2026-06-18T16:00:00','Mercedes-Benz Stadium','Atlanta',         'EUA',   1,1,'encerrado'),
('grupo','A',2, 1, 2,'2026-06-19T01:00:00','Estadio Akron',        'Guadalajara',     'México',1,0,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','A',3, 4, 1,'2026-06-25T01:00:00','Estádio Azteca',       'Cidade do México','México',0,3,'encerrado'),
('grupo','A',3, 3, 2,'2026-06-25T01:00:00','Estadio BBVA',         'Monterrey',       'México',1,0,'encerrado');

-- =========================================================
-- GRUPO B — Canadá(5) Suíça(6) Catar(7) Bósnia(8)
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','B',1, 5, 8,'2026-06-12T19:00:00','BMO Field',    'Toronto',     'Canadá',1,1,'encerrado'),
('grupo','B',1, 7, 6,'2026-06-13T19:00:00','Levi''s Stadium','Santa Clara','EUA',  1,1,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','B',2, 6, 8,'2026-06-18T19:00:00','SoFi Stadium', 'Los Angeles', 'EUA',  4,1,'encerrado'),
('grupo','B',2, 5, 7,'2026-06-18T22:00:00','BC Place',     'Vancouver',   'Canadá',6,0,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','B',3, 6, 5,'2026-06-24T19:00:00','BC Place',     'Vancouver',   'Canadá',2,1,'encerrado'),
('grupo','B',3, 8, 7,'2026-06-24T19:00:00','Lumen Field',  'Seattle',     'EUA',  3,1,'encerrado');

-- =========================================================
-- GRUPO C — Brasil(9) Marrocos(10) Escócia(11) Haiti(12)
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','C',1, 9,10,'2026-06-13T22:00:00','MetLife Stadium',       'Nova York',   'EUA',1,1,'encerrado'),
('grupo','C',1,12,11,'2026-06-14T01:00:00','Gillette Stadium',       'Boston',      'EUA',0,1,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','C',2,11,10,'2026-06-19T22:00:00','Gillette Stadium',       'Boston',      'EUA',0,1,'encerrado'),
('grupo','C',2, 9,12,'2026-06-20T00:30:00','Lincoln Financial Field','Filadélfia',  'EUA',3,0,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','C',3,11, 9,'2026-06-24T22:00:00','Hard Rock Stadium',      'Miami',       'EUA',0,3,'encerrado'),
('grupo','C',3,10,12,'2026-06-24T22:00:00','Mercedes-Benz Stadium',  'Atlanta',     'EUA',4,2,'encerrado');

-- =========================================================
-- GRUPO D — EUA(13) Austrália(14) Paraguai(15) Turquia(16)
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','D',1,13,15,'2026-06-13T01:00:00','SoFi Stadium', 'Los Angeles','EUA',4,1,'encerrado'),
('grupo','D',1,14,16,'2026-06-14T04:00:00','BC Place',     'Vancouver',  'Canadá',2,0,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','D',2,13,14,'2026-06-19T19:00:00','Lumen Field',  'Seattle',    'EUA',2,0,'encerrado'),
('grupo','D',2,16,15,'2026-06-20T03:00:00','Levi''s Stadium','Santa Clara','EUA',0,1,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','D',3,16,13,'2026-06-26T02:00:00','SoFi Stadium', 'Los Angeles','EUA',3,2,'encerrado'),
('grupo','D',3,15,14,'2026-06-26T02:00:00','Levi''s Stadium','Santa Clara','EUA',0,0,'encerrado');

-- =========================================================
-- GRUPO E — Alemanha(17) Equador(18) Costa do Marfim(19) Curaçao(20)
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','E',1,17,20,'2026-06-14T17:00:00','NRG Stadium',           'Houston',    'EUA',7,1,'encerrado'),
('grupo','E',1,19,18,'2026-06-14T23:00:00','Lincoln Financial Field','Filadélfia', 'EUA',1,0,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','E',2,17,19,'2026-06-20T20:00:00','BMO Field',             'Toronto',    'Canadá',2,1,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','E',2,18,20,'2026-06-21T00:00:00','Arrowhead Stadium',     'Kansas City','EUA',0,0,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','E',3,20,19,'2026-06-25T20:00:00','Lincoln Financial Field','Filadélfia', 'EUA',0,2,'encerrado'),
('grupo','E',3,18,17,'2026-06-25T20:00:00','MetLife Stadium',       'Nova York',  'EUA',2,1,'encerrado');

-- =========================================================
-- GRUPO F — Holanda(21) Japão(22) Tunísia(23) Suécia(24)
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','F',1,21,22,'2026-06-14T20:00:00','AT&T Stadium', 'Dallas',      'EUA',   2,2,'encerrado'),
('grupo','F',1,24,23,'2026-06-15T02:00:00','Estadio BBVA', 'Monterrey',   'México',5,1,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','F',2,21,24,'2026-06-20T17:00:00','NRG Stadium',  'Houston',     'EUA',   5,1,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','F',2,23,22,'2026-06-21T04:00:00','Estadio BBVA', 'Monterrey',   'México',0,4,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','F',3,22,24,'2026-06-25T23:00:00','AT&T Stadium', 'Dallas',      'EUA',   1,1,'encerrado'),
('grupo','F',3,23,21,'2026-06-25T23:00:00','Arrowhead Stadium','Kansas City','EUA', 1,3,'encerrado');

-- =========================================================
-- GRUPO G — Bélgica(25) Irã(26) Egito(27) Nova Zelândia(28)
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','G',1,25,27,'2026-06-15T19:00:00','Lumen Field','Seattle',     'EUA',1,1,'encerrado'),
('grupo','G',1,26,28,'2026-06-16T01:00:00','SoFi Stadium','Los Angeles','EUA',2,2,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','G',2,25,26,'2026-06-21T19:00:00','SoFi Stadium','Los Angeles','EUA',0,0,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','G',2,28,27,'2026-06-22T01:00:00','BC Place',    'Vancouver',  'Canadá',1,3,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','G',3,27,26,'2026-06-27T03:00:00','Lumen Field','Seattle',    'EUA',1,1,'encerrado'),
('grupo','G',3,28,25,'2026-06-27T03:00:00','BC Place',   'Vancouver',  'Canadá',1,5,'encerrado');

-- =========================================================
-- GRUPO H — Espanha(29) Uruguai(30) Arábia Saudita(31) Cabo Verde(32)
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','H',1,29,32,'2026-06-15T16:00:00','Mercedes-Benz Stadium','Atlanta','EUA',0,0,'encerrado'),
('grupo','H',1,31,30,'2026-06-15T22:00:00','Hard Rock Stadium',    'Miami',  'EUA',1,1,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','H',2,29,31,'2026-06-21T16:00:00','Mercedes-Benz Stadium','Atlanta','EUA',4,0,'encerrado'),
('grupo','H',2,30,32,'2026-06-21T22:00:00','Hard Rock Stadium',    'Miami',  'EUA',2,2,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','H',3,32,31,'2026-06-27T00:00:00','NRG Stadium',  'Houston',    'EUA',0,0,'encerrado'),
('grupo','H',3,30,29,'2026-06-27T00:00:00','Estadio Akron','Guadalajara','México',0,1,'encerrado');

-- =========================================================
-- GRUPO I — França(33) Senegal(34) Noruega(35) Iraque(36)
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','I',1,33,34,'2026-06-16T19:00:00','MetLife Stadium', 'Nova York','EUA',3,1,'encerrado'),
('grupo','I',1,36,35,'2026-06-16T22:00:00','Gillette Stadium','Boston',   'EUA',1,4,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','I',2,33,36,'2026-06-22T21:00:00','Lincoln Financial Field','Filadélfia','EUA',3,0,'encerrado'),
('grupo','I',2,35,34,'2026-06-23T00:00:00','MetLife Stadium',        'Nova York', 'EUA',3,2,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','I',3,35,33,'2026-06-26T19:00:00','Gillette Stadium','Boston', 'EUA',1,4,'encerrado'),
('grupo','I',3,34,36,'2026-06-26T19:00:00','BMO Field',       'Toronto','Canadá',5,0,'encerrado');

-- =========================================================
-- GRUPO J — Argentina(37) Áustria(38) Argélia(39) Jordânia(40)
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','J',1,37,39,'2026-06-17T01:00:00','Arrowhead Stadium','Kansas City','EUA',3,0,'encerrado'),
('grupo','J',1,38,40,'2026-06-17T04:00:00','Levi''s Stadium',  'Santa Clara','EUA',3,1,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','J',2,37,38,'2026-06-22T17:00:00','AT&T Stadium', 'Dallas',     'EUA',2,0,'encerrado'),
('grupo','J',2,40,39,'2026-06-23T03:00:00','Levi''s Stadium','Santa Clara','EUA',1,2,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','J',3,39,38,'2026-06-28T02:00:00','Arrowhead Stadium','Kansas City','EUA',3,3,'encerrado'),
('grupo','J',3,40,37,'2026-06-28T02:00:00','AT&T Stadium',     'Dallas',    'EUA',1,3,'encerrado');

-- =========================================================
-- GRUPO K — Portugal(41) Colômbia(42) Uzbequistão(43) Congo RD(44)
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','K',1,41,44,'2026-06-17T17:00:00','NRG Stadium',   'Houston',          'EUA',   1,1,'encerrado'),
('grupo','K',1,43,42,'2026-06-18T02:00:00','Estádio Azteca','Cidade do México',  'México',1,3,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','K',2,41,43,'2026-06-23T17:00:00','NRG Stadium',   'Houston',          'EUA',   5,0,'encerrado'),
('grupo','K',2,42,44,'2026-06-24T02:00:00','Estadio Akron', 'Guadalajara',       'México',1,0,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','K',3,42,41,'2026-06-27T23:30:00','Hard Rock Stadium',    'Miami',  'EUA',0,0,'encerrado'),
('grupo','K',3,44,43,'2026-06-27T23:30:00','Mercedes-Benz Stadium','Atlanta','EUA',3,1,'encerrado');

-- =========================================================
-- GRUPO L — Inglaterra(45) Croácia(46) Panamá(47) Gana(48)
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','L',1,45,46,'2026-06-17T20:00:00','AT&T Stadium','Dallas', 'EUA',4,2,'encerrado'),
('grupo','L',1,48,47,'2026-06-17T23:00:00','BMO Field',   'Toronto','Canadá',1,0,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','L',2,45,48,'2026-06-23T20:00:00','Gillette Stadium','Boston', 'EUA',0,0,'encerrado'),
('grupo','L',2,47,46,'2026-06-23T23:00:00','BMO Field',       'Toronto','Canadá',0,1,'encerrado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('grupo','L',3,47,45,'2026-06-27T21:00:00','MetLife Stadium',        'Nova York',  'EUA',0,2,'encerrado'),
('grupo','L',3,46,48,'2026-06-27T21:00:00','Lincoln Financial Field','Filadélfia', 'EUA',2,1,'encerrado');

-- =========================================================
-- MATA-MATA — ROUND OF 32 (16-avos de final) — 28/06 a 03/07
-- Chaveamento oficial FIFA (Wikipedia). 8 melhores 3ºs: grupos B,D,E,F,I,J,K,L.
-- Confrontos (Match 73–88 FIFA):
--   2A×2B, 1E×3D, 1F×2C, 1C×2F, 1I×3F, 2E×2I, 1A×3E, 1L×3K,
--   1D×3B, 1G×3I, 2K×2L, 1H×2J, 1B×3J, 1J×2H, 1K×3L, 2D×2G
-- =========================================================
-- Encerrados:
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,status) VALUES
('dezesseis_avos',NULL,NULL, 3, 5,'2026-06-28T19:00:00','SoFi Stadium',          'Inglewood',       'EUA',   0,1,'encerrado'), -- M73 África do Sul 0×1 Canadá (Eustáquio 90+2') — Canadá avança
('dezesseis_avos',NULL,NULL, 9,22,'2026-06-29T17:00:00','NRG Stadium',           'Houston',         'EUA',   2,1,'encerrado'); -- M76 Brasil 2×1 Japão (Casemiro 56', Martinelli 90+1'; Sano 29') — Brasil avança
-- Encerrados (decididos nos pênaltis):
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,gols_a,gols_b,penaltis_a,penaltis_b,status) VALUES
('dezesseis_avos',NULL,NULL,17,15,'2026-06-29T20:30:00','Gillette Stadium',      'Foxborough',      'EUA',   1,1,3,4,'encerrado'), -- M74 Alemanha 1×1 Paraguai (Havertz; Enciso) — Paraguai vence 4×3 nos pênaltis (morte súbita) e avança
('dezesseis_avos',NULL,NULL,21,10,'2026-06-30T01:00:00','Estadio BBVA',          'Guadalupe',       'México',1,1,2,3,'encerrado'); -- M75 Holanda 1×1 Marrocos (Gakpo 72'; Diop 90+) — Marrocos vence 3×2 nos pênaltis e avança
-- Agendados:
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('dezesseis_avos',NULL,NULL,19,35,'2026-06-30T17:00:00','AT&T Stadium',          'Arlington',       'EUA',   'agendado'), -- M78 Costa do Marfim × Noruega
('dezesseis_avos',NULL,NULL,33,24,'2026-06-30T21:00:00','MetLife Stadium',       'Nova York',       'EUA',   'agendado'), -- M77 França × Suécia
('dezesseis_avos',NULL,NULL, 1,18,'2026-07-01T01:00:00','Estádio Azteca',        'Cidade do México','México','agendado'), -- M79 México × Equador
('dezesseis_avos',NULL,NULL,45,44,'2026-07-01T16:00:00','Mercedes-Benz Stadium', 'Atlanta',         'EUA',   'agendado'), -- M80 Inglaterra × Rep. Dem. do Congo
('dezesseis_avos',NULL,NULL,25,34,'2026-07-01T20:00:00','Lumen Field',           'Seattle',         'EUA',   'agendado'), -- M82 Bélgica × Senegal
('dezesseis_avos',NULL,NULL,13, 8,'2026-07-02T00:00:00','Levi''s Stadium',       'Santa Clara',     'EUA',   'agendado'), -- M81 Estados Unidos × Bósnia e Herzegovina
('dezesseis_avos',NULL,NULL,29,38,'2026-07-02T19:00:00','SoFi Stadium',          'Inglewood',       'EUA',   'agendado'), -- M84 Espanha × Áustria
('dezesseis_avos',NULL,NULL,41,46,'2026-07-02T23:00:00','BMO Field',             'Toronto',         'Canadá','agendado'), -- M83 Portugal × Croácia
('dezesseis_avos',NULL,NULL, 6,39,'2026-07-03T03:00:00','BC Place',              'Vancouver',       'Canadá','agendado'), -- M85 Suíça × Argélia
('dezesseis_avos',NULL,NULL,14,27,'2026-07-03T18:00:00','AT&T Stadium',          'Arlington',       'EUA',   'agendado'), -- M88 Austrália × Egito
('dezesseis_avos',NULL,NULL,37,32,'2026-07-03T22:00:00','Hard Rock Stadium',     'Miami Gardens',   'EUA',   'agendado'), -- M86 Argentina × Cabo Verde
('dezesseis_avos',NULL,NULL,42,48,'2026-07-04T01:30:00','Arrowhead Stadium',     'Kansas City',     'EUA',   'agendado'); -- M87 Colômbia × Gana

-- =========================================================
-- OITAVAS DE FINAL (Round of 16) — 04/07 a 07/07
-- Chaveamento oficial FIFA (Wikipedia). Confrontos M89–M96.
-- Vencedores já definidos do R32 posicionados; selecao NULL = "a definir"
-- (depende de jogo do R32 ainda não disputado). Preencher conforme avançam.
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('oitavas',NULL,NULL,15,NULL,'2026-07-04T21:00:00','Lincoln Financial Field','Filadélfia',     'EUA','agendado'), -- M89 Paraguai × (vencedor M77 França/Suécia)
('oitavas',NULL,NULL, 5,  10,'2026-07-04T17:00:00','NRG Stadium',            'Houston',        'EUA','agendado'), -- M90 Canadá × Marrocos
('oitavas',NULL,NULL, 9,NULL,'2026-07-05T20:00:00','MetLife Stadium',        'East Rutherford','EUA','agendado'); -- M91 Brasil × (vencedor M78 Costa do Marfim/Noruega)
