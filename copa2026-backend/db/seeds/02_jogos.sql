-- 72 jogos da fase de grupos (12 grupos × 6 jogos = 72)
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
-- GRUPO A — Sedes mexicanas (Azteca, Akron, BBVA)
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','A',1,1,4,'2026-06-11T20:00:00','Estádio Azteca','Cidade do México','México','agendado'),
('grupo','A',1,2,3,'2026-06-12T16:00:00','Estadio Akron','Guadalajara','México','agendado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','A',2,1,3,'2026-06-16T20:00:00','Estádio Azteca','Cidade do México','México','agendado'),
('grupo','A',2,2,4,'2026-06-16T23:00:00','Estadio BBVA','Monterrey','México','agendado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','A',3,1,2,'2026-06-25T20:00:00','Estádio Azteca','Cidade do México','México','agendado'),
('grupo','A',3,3,4,'2026-06-25T20:00:00','Estadio Akron','Guadalajara','México','agendado');

-- =========================================================
-- GRUPO B — Sedes canadenses (BMO Field, BC Place) + Gillette
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','B',1,5,8,'2026-06-12T20:00:00','BMO Field','Toronto','Canadá','agendado'),
('grupo','B',1,6,7,'2026-06-12T23:00:00','BC Place','Vancouver','Canadá','agendado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','B',2,5,7,'2026-06-17T16:00:00','BMO Field','Toronto','Canadá','agendado'),
('grupo','B',2,6,8,'2026-06-17T20:00:00','Gillette Stadium','Boston','EUA','agendado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','B',3,5,6,'2026-06-26T20:00:00','BC Place','Vancouver','Canadá','agendado'),
('grupo','B',3,7,8,'2026-06-26T20:00:00','BMO Field','Toronto','Canadá','agendado');

-- =========================================================
-- GRUPO C — MetLife, AT&T, SoFi
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','C',1,9,12,'2026-06-13T00:00:00','MetLife Stadium','Nova York','EUA','agendado'),
('grupo','C',1,10,11,'2026-06-13T20:00:00','AT&T Stadium','Dallas','EUA','agendado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','C',2,9,11,'2026-06-17T23:00:00','MetLife Stadium','Nova York','EUA','agendado'),
('grupo','C',2,10,12,'2026-06-18T16:00:00','SoFi Stadium','Los Angeles','EUA','agendado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','C',3,9,10,'2026-06-26T23:00:00','MetLife Stadium','Nova York','EUA','agendado'),
('grupo','C',3,11,12,'2026-06-26T23:00:00','AT&T Stadium','Dallas','EUA','agendado');

-- =========================================================
-- GRUPO D — AT&T, Levi's, Arrowhead
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','D',1,13,16,'2026-06-14T00:00:00','AT&T Stadium','Dallas','EUA','agendado'),
('grupo','D',1,14,15,'2026-06-13T16:00:00','Levi''s Stadium','San Francisco','EUA','agendado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','D',2,13,15,'2026-06-18T20:00:00','AT&T Stadium','Dallas','EUA','agendado'),
('grupo','D',2,14,16,'2026-06-18T23:00:00','Arrowhead Stadium','Kansas City','EUA','agendado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','D',3,13,14,'2026-06-27T20:00:00','AT&T Stadium','Dallas','EUA','agendado'),
('grupo','D',3,15,16,'2026-06-27T20:00:00','Levi''s Stadium','San Francisco','EUA','agendado');

-- =========================================================
-- GRUPO E — Mercedes-Benz, NRG, Lincoln Financial
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','E',1,17,20,'2026-06-14T16:00:00','Mercedes-Benz Stadium','Atlanta','EUA','agendado'),
('grupo','E',1,18,19,'2026-06-14T20:00:00','NRG Stadium','Houston','EUA','agendado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','E',2,17,19,'2026-06-19T16:00:00','Mercedes-Benz Stadium','Atlanta','EUA','agendado'),
('grupo','E',2,18,20,'2026-06-19T20:00:00','Lincoln Financial Field','Filadélfia','EUA','agendado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','E',3,17,18,'2026-06-27T23:00:00','Mercedes-Benz Stadium','Atlanta','EUA','agendado'),
('grupo','E',3,19,20,'2026-06-27T23:00:00','NRG Stadium','Houston','EUA','agendado');

-- =========================================================
-- GRUPO F — SoFi, Lumen Field, Hard Rock
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','F',1,21,24,'2026-06-15T16:00:00','SoFi Stadium','Los Angeles','EUA','agendado'),
('grupo','F',1,22,23,'2026-06-15T20:00:00','Lumen Field','Seattle','EUA','agendado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','F',2,21,23,'2026-06-20T16:00:00','SoFi Stadium','Los Angeles','EUA','agendado'),
('grupo','F',2,22,24,'2026-06-20T20:00:00','Hard Rock Stadium','Miami','EUA','agendado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','F',3,21,22,'2026-06-28T20:00:00','SoFi Stadium','Los Angeles','EUA','agendado'),
('grupo','F',3,23,24,'2026-06-28T20:00:00','Lumen Field','Seattle','EUA','agendado');

-- =========================================================
-- GRUPO G — MetLife, Gillette, Lincoln Financial
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','G',1,25,28,'2026-06-15T23:00:00','MetLife Stadium','Nova York','EUA','agendado'),
('grupo','G',1,26,27,'2026-06-16T16:00:00','Gillette Stadium','Boston','EUA','agendado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','G',2,25,27,'2026-06-20T23:00:00','MetLife Stadium','Nova York','EUA','agendado'),
('grupo','G',2,26,28,'2026-06-21T16:00:00','Lincoln Financial Field','Filadélfia','EUA','agendado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','G',3,25,26,'2026-06-29T20:00:00','MetLife Stadium','Nova York','EUA','agendado'),
('grupo','G',3,27,28,'2026-06-29T20:00:00','Gillette Stadium','Boston','EUA','agendado');

-- =========================================================
-- GRUPO H — Rose Bowl, Arrowhead, Hard Rock
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','H',1,29,32,'2026-06-16T20:00:00','Rose Bowl','Los Angeles','EUA','agendado'),
('grupo','H',1,30,31,'2026-06-17T00:00:00','Arrowhead Stadium','Kansas City','EUA','agendado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','H',2,29,31,'2026-06-21T20:00:00','Rose Bowl','Los Angeles','EUA','agendado'),
('grupo','H',2,30,32,'2026-06-21T23:00:00','Hard Rock Stadium','Miami','EUA','agendado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','H',3,29,30,'2026-06-29T23:00:00','Rose Bowl','Los Angeles','EUA','agendado'),
('grupo','H',3,31,32,'2026-06-29T23:00:00','Arrowhead Stadium','Kansas City','EUA','agendado');

-- =========================================================
-- GRUPO I — NRG, BMO Field, Mercedes-Benz
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','I',1,33,36,'2026-06-17T16:00:00','NRG Stadium','Houston','EUA','agendado'),
('grupo','I',1,34,35,'2026-06-17T20:00:00','BMO Field','Toronto','Canadá','agendado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','I',2,33,35,'2026-06-22T16:00:00','NRG Stadium','Houston','EUA','agendado'),
('grupo','I',2,34,36,'2026-06-22T20:00:00','Mercedes-Benz Stadium','Atlanta','EUA','agendado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','I',3,33,34,'2026-06-30T20:00:00','NRG Stadium','Houston','EUA','agendado'),
('grupo','I',3,35,36,'2026-06-30T20:00:00','BMO Field','Toronto','Canadá','agendado');

-- =========================================================
-- GRUPO J — AT&T, Hard Rock, SoFi
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','J',1,37,40,'2026-06-18T00:00:00','AT&T Stadium','Dallas','EUA','agendado'),
('grupo','J',1,38,39,'2026-06-18T16:00:00','Hard Rock Stadium','Miami','EUA','agendado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','J',2,37,39,'2026-06-22T23:00:00','AT&T Stadium','Dallas','EUA','agendado'),
('grupo','J',2,38,40,'2026-06-23T16:00:00','SoFi Stadium','Los Angeles','EUA','agendado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','J',3,37,38,'2026-06-30T23:00:00','AT&T Stadium','Dallas','EUA','agendado'),
('grupo','J',3,39,40,'2026-06-30T23:00:00','Hard Rock Stadium','Miami','EUA','agendado');

-- =========================================================
-- GRUPO K — Lincoln Financial, Levi's, Estadio Azteca
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','K',1,41,44,'2026-06-19T00:00:00','Lincoln Financial Field','Filadélfia','EUA','agendado'),
('grupo','K',1,42,43,'2026-06-19T16:00:00','Levi''s Stadium','San Francisco','EUA','agendado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','K',2,41,43,'2026-06-23T20:00:00','Lincoln Financial Field','Filadélfia','EUA','agendado'),
('grupo','K',2,42,44,'2026-06-24T00:00:00','Estadio Azteca','Cidade do México','México','agendado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','K',3,41,42,'2026-07-01T20:00:00','Lincoln Financial Field','Filadélfia','EUA','agendado'),
('grupo','K',3,43,44,'2026-07-01T20:00:00','Levi''s Stadium','San Francisco','EUA','agendado');

-- =========================================================
-- GRUPO L — Lumen Field, BC Place, Rose Bowl
-- =========================================================
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','L',1,45,48,'2026-06-19T20:00:00','Lumen Field','Seattle','EUA','agendado'),
('grupo','L',1,46,47,'2026-06-20T00:00:00','BC Place','Vancouver','Canadá','agendado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','L',2,45,47,'2026-06-24T16:00:00','Lumen Field','Seattle','EUA','agendado'),
('grupo','L',2,46,48,'2026-06-24T20:00:00','Rose Bowl','Los Angeles','EUA','agendado');
INSERT INTO jogos (fase,grupo,rodada,selecao_a_id,selecao_b_id,data_hora_utc,estadio,cidade,pais_sede,status) VALUES
('grupo','L',3,45,46,'2026-07-01T23:00:00','Lumen Field','Seattle','EUA','agendado'),
('grupo','L',3,47,48,'2026-07-01T23:00:00','BC Place','Vancouver','Canadá','agendado');
