import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Check, X, MapPin, Bus, Download, RotateCcw, Search, Phone, Edit2, Lock, LogOut, EyeOff, Crown, FileText, Users, GraduationCap, ListFilter, Save, ShieldAlert, CreditCard, Hash, User, Bell, ArrowUpDown, ArrowDownAZ, Armchair, LayoutGrid, UserPlus, Bath, Upload, FileCheck, Ticket, ExternalLink, Unlock, AlertTriangle, Eye, KeyRound, FileWarning } from 'lucide-react';

// --- CONFIGURACIÓN DE SUPABASE ---
const SUPABASE_URL = 'https://fgzegoflnkwkcztivila.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnemVnb2Zsbmt3a2N6dGl2aWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMzQyOTYsImV4cCI6MjA3OTkxMDI5Nn0.-u-NUiR5Eqitf4-zqvAAZhTKHc1_Cj3OKHAhGRHl8Xs';

// --- LISTAS OFICIALES POR CAMIÓN ---

// CAMIÓN 1 (SAMUEL)
const OFFICIAL_LIST_C1 = [
  { name: "Joseph Yancarlo Avalos Canales", phone: "3171325247", code: "225519213", amount: 480, nss: "5251056577", parent: "Lenis Alejandra Canales Castro", parentPhone: "3171048798" },
  { name: "Daira Athziri Saldaña Dávila", phone: "3171284644", code: "225521072", amount: 480, nss: "4927321887", parent: "María Luisa Dávila Muñoz", parentPhone: "3171146753" },
  { name: "Fernanda Saraly Garcia Lopez", phone: "3171066092", code: "225517318", amount: 480, nss: "4109019556", parent: "Rosario Guadalupe López Guerrero", parentPhone: "3171046130" },
  { name: "Axel Yael Anguiano Ramirez", phone: "3171089872", code: "225517423", amount: 480, nss: "52241073510", parent: "Isaura Ramírez Cortes", parentPhone: "3173875541" },
  { name: "Danniel Santiago Martinez Mendoza", phone: "3171051172", code: "225517431", amount: 480, nss: "45058351331", parent: "Daniela Guadalupe Mendoza Casillas", parentPhone: "3171064715" },
  { name: "Karla Joselyn Delgadillo Lizaola", phone: "3178731763", code: "223440318", amount: 480, nss: "60230824843", parent: "Sergio Emanuel Garibaldo Delgadillo", parentPhone: "3171285349" },
  { name: "Jose Armando Mejia Capacete", phone: "3326321025", code: "224080293", amount: 480, nss: "N/A", parent: "Maria Elena Capacete Chavez", parentPhone: "3171066215" },
  { name: "Kamila Zohemi Soto Ramos", phone: "3171002497", code: "224079929", amount: 480, nss: "19230886418", parent: "Iliana arina Ramos Dávila", parentPhone: "3173831730" },
  { name: "Jose de Jesús Orozco Garcia", phone: "3171041595", code: "N/A", amount: 480, nss: "4038697407", parent: "Karla Gisela Garcia Flores", parentPhone: "3171231595" },
  { name: "Sofia Guadalupe Delgadillo Barbosa", phone: "3173895711", code: "225517784", amount: 480, nss: "4967734775", parent: "Maria Guadalupe Barbosa Soltero", parentPhone: "3178735048" },
  { name: "Brittany Celeste Ortega Aguilar", phone: "3171078377", code: "225079589", amount: 480, nss: "3230814679", parent: "Maria Gabriela Aguilar Garcia", parentPhone: "3171281861" },
  { name: "Britany Guadalupe Horta Fuentes", phone: "3171213307", code: "224082423", amount: 480, nss: "58230870931", parent: "Juleitti Guadalupe Fuentes Bañuelos", parentPhone: "3171209722" },
  { name: "Priscila Gomez Nuñes", phone: "3171124221", code: "224079775", amount: 480, nss: "60230863734", parent: "Humberto Gomez Cisneros", parentPhone: "3173871279" },
  { name: "Donovan Eduardo Borbon Michel", phone: "3171082695", code: "223443937", amount: 480, nss: "2210867210", parent: "Hector Alejandro Borbon Torres", parentPhone: "3171203250" },
  { name: "Andrei Alexander Cuellar Ponce", phone: "3171050219", code: "224079562", amount: 480, nss: "19230868986", parent: "Alicia Abigail Ponce Ambriz", parentPhone: "3171074358" },
  { name: "Edwin Javier Robles Torres", phone: "3171126265", code: "223443325", amount: 480, nss: "N/A", parent: "Mariela Torres Pelayo", parentPhone: "3173873538" },
  { name: "Vanessa Guzman Zarazua", phone: "3171125243", code: "223442213", amount: 480, nss: "60230868287", parent: "German Guzman Sanchez", parentPhone: "3171078068" },
  { name: "Kimberly Lorena Gutierrez Tovar", phone: "3171094446", code: "223441101", amount: 480, nss: "19230891814", parent: "Dalia Morayma Tovar Iglesias", parentPhone: "3171121633" },
  { name: "Melanie Kamila Diaz Rios", phone: "3173833120", code: "224079279", amount: 480, nss: "404863075", parent: "Max Fernando Diaz Medina", parentPhone: "3171035612" },
  { name: "Jonathan Victor Hugo Lopez Montaño", phone: "3171296534", code: "224080765", amount: 480, nss: "3230829370", parent: "Marisol Montaño Ortega", parentPhone: "3171075014" },
  { name: "Ariadna Martinez Martinez", phone: "3171318301", code: "223441926", amount: 300, nss: "58230869834", parent: "Karla Janeth Martinez Castillo", parentPhone: "3171035583" },
  { name: "Alfonso Hueso Vidrio", phone: "3171361187", code: "224082121", amount: 480, nss: "5823086794", parent: "Ofelia Vidrio Guzman", parentPhone: "3173884314" },
  { name: "Kevin Nahir Zamora Martinez", phone: "3171134655", code: "224429776", amount: 480, nss: "17240998512", parent: "Silvestre Zamora Duran", parentPhone: "3173851523" },
  { name: "Oscar Daniel Gomez Melendez", phone: "3344335726", code: "223441128", amount: 480, nss: "19230895609", parent: "Daniel Gomez Carreño", parentPhone: "3171160665" },
  { name: "Kenya Mariana Dominguez Ramos", phone: "3171115887", code: "223442884", amount: 480, nss: "8392771293-1", parent: "Jose Luis Dominguez Ruiz", parentPhone: "3173883215" },
  { name: "Brisa Guadalupe Guerrero Buenrostro", phone: "3171111049", code: "224429393", amount: 480, nss: "18240990004", parent: "Luis Octavio Guerrero Rodriguez", parentPhone: "3171111049" },
  { name: "Rosa Camila Garcia Caloca", phone: "3171070658", code: "552217385", amount: 480, nss: "N/A", parent: "Maria del Rosario Garcia Caloca", parentPhone: "3173883392" },
  { name: "Evelyn Marlen Ruiz Solano", phone: "3171286183", code: "224427625", amount: 480, nss: "5240996602", parent: "Rosy Janeth Solano Rodriguez", parentPhone: "3171160255" },
  { name: "Kevin Alfonso Perez Cardenas", phone: "3171127866", code: "224430057", amount: 480, nss: "38250960770", parent: "Cesar Perez Oliva", parentPhone: "3171001456" },
  { name: "Jazmin Elizabeth Savalza Gonzalez", phone: "3171085894", code: "224427544", amount: 300, nss: "5240908011", parent: "Elisa Gonzalez Jimenez", parentPhone: "3171054594" },
  { name: "Alexa Fernanda Maldonado Gutierrez", phone: "3332527487", code: "224429547", amount: 300, nss: "17240976989", parent: "Claudia Yesenia Gutierrez Torres", parentPhone: "3411389939" },
  { name: "Ana Yatziry Lopez Preciado", phone: "3171132231", code: "225200381", amount: 480, nss: "3250990383", parent: "Karla Liliana Preciado Guzman", parentPhone: "3171118799" },
  { name: "Angel Uriel Pelayo Gutierrez", phone: "3171048425", code: "224428079", amount: 480, nss: "0325093452-2", parent: "Christian Ulises Pelayo Almanza", parentPhone: "3171011621" },
  { name: "Alejandra Estefania Yañez Fernandez", phone: "3171013245", code: "224011964", amount: 480, nss: "N/A", parent: "Mayra Yanuaria Fernandez Lopez", parentPhone: "3171219835" },
  { name: "Cristhian Martin Ramirez Jimenez", phone: "3171083416", code: "223444171", amount: 300, nss: "N/A", parent: "Esmeralda del Carmen Jimenez Lopez", parentPhone: "3171064911" },
  { name: "Teresa Madeleine Garcia Viramontes", phone: "3171059501", code: "N/A", amount: 480, nss: "5180386913", parent: "Everardo Garcia Rubalcaba", parentPhone: "3171436810" },
  { name: "Luna Renata Sanchez Benitez", phone: "3173882461", code: "225520653", amount: 480, nss: "3251039651", parent: "Adali Carolina Benitez Garcia", parentPhone: "3171203411" },
  { name: "Andrea Monserrat Galarza Benavides", phone: "3171195178", code: "225201361", amount: 480, nss: "N/A", parent: "Eva Josefina Benavides Hernandez", parentPhone: "3173830633" },
  { name: "Maria José Castillo Barreto", phone: "3171113312", code: "N/A", amount: 480, nss: "Pendiente", parent: "Pendiente", parentPhone: "Pendiente" },
  { name: "Ricardo Daniel Madrigal Trujillo", phone: "3171076126", code: "N/A", amount: 300, nss: "5210658802", parent: "Kenia Marina Trujillo Rodriguez", parentPhone: "3171072221" },
  { name: "Ricardo Ponce Orellana", phone: "3171121197", code: "224429563", amount: 480, nss: "18240985046", parent: "Berta Alicia Gonzalez Sevilla", parentPhone: "3171133752" },
  { name: "Carolina Trinidad Orozco", phone: "3171211500", code: "225520491", amount: 300, nss: "Pendiente", parent: "Pendiente", parentPhone: "Pendiente" },
  { name: "Aldo Ivan Lepe Figueroa", phone: "3171071964", code: "225200217", amount: 480, nss: "Pendiente", parent: "Pendiente", parentPhone: "Pendiente" },
  { name: "Arturo Pioquinto Alanis Avioneda", phone: "3171312596", code: "22519865", amount: 480, nss: "5240959782", parent: "Alejandra Avianeda Gutierrez", parentPhone: "3171237127" },
  { name: "Samuel Méndez Vidrio", phone: "3125950081", code: "223440784", amount: 480, nss: "N/A", parent: "N/A", parentPhone: "N/A" }
];

// CAMIÓN 2 (AYLIN)
const OFFICIAL_LIST_C2 = [
    { name: "Ian Raphael Aguilar Gonzales", phone: "3171281276", code: "1A matutino", amount: 480, nss: "4047901592", parent: "Antonia González franco", parentPhone: "3173836225" },
    { name: "Joselin Liset Gómez Macías", phone: "3171292705", code: "2C matutino", amount: 480, nss: "19240969204", parent: "Jorge Armando Gómez Guzmán", parentPhone: "3411604229" },
    { name: "Adrián Villafaña Navarro", phone: "3171079620", code: "5C matutino", amount: 480, nss: "5823086247", parent: "Blanca Raquel Navarro flores", parentPhone: "5587500515" },
    { name: "Hermione Elizabeth Gonzalez Villaseñor", phone: "3171283727", code: "1C matutino", amount: 480, nss: "2181018496", parent: "Gustavo Gonzales García", parentPhone: "3412051551" },
    { name: "Miguel Ángel Vázquez Rosales", phone: "3171067436", code: "1C matutino", amount: 480, nss: "3251052654", parent: "Miriam Consuelo rosales Tapia", parentPhone: "3171061412" },
    { name: "Fatima Elizabet Rubio Galindo", phone: "3171003776", code: "1B vespertino", amount: 480, nss: "4977509597", parent: "María del Rosario Galindo Gonzales", parentPhone: "3173873442" },
    { name: "Leonardo Rubio Galindo", phone: "3171127532", code: "3C matutino", amount: 480, nss: "56230952204", parent: "Mario del Rosario Galindo", parentPhone: "3173873442" },
    { name: "Ángela Valeria Guerra Cruz", phone: "3171067907", code: "2D vespertino", amount: 480, nss: "54977910246", parent: "Alfredo Guerra Carrizales", parentPhone: "3173817075" },
    { name: "Paulina Gómez Delgadillo", phone: "3171287000", code: "4D matutino", amount: 480, nss: "5230827221", parent: "Anabel Delgadillo", parentPhone: "3171049901" },
    { name: "Karen Elizabeth Guitron Contreras", phone: "3171198085", code: "1B vespertino", amount: 480, nss: "2187056607", parent: "Miriam Yaritzha Guitron Contreras", parentPhone: "3411233286" },
    { name: "Andrea Navarro Tapia", phone: "3334866670", code: "3B matutino", amount: 480, nss: "57230907727", parent: "Jesús Salvador Navarro moran", parentPhone: "3173837366" },
    { name: "Stephanie Victoria Reyes Cabrera", phone: "3171286611", code: "3D matutino", amount: 480, nss: "3168847758", parent: "Salomé Monserrat Cabrera Vaca", parentPhone: "3171237510" },
    { name: "Jesús Alejandro González Michel", phone: "3171316508", code: "3B matutino", amount: 480, nss: "17240961148", parent: "Claudia Araceli Michel peña", parentPhone: "3171207102" },
    { name: "Gabriela Lizbeth Guzmán López", phone: "3171136149", code: "1D matutino", amount: 480, nss: "67040811794", parent: "Lizbeth López Cabrera", parentPhone: "3171055052" },
    { name: "Maximiliano Pérez Reynaga", phone: "3171003536", code: "1C matutino", amount: 480, nss: "4987665116", parent: "Guadalupe Reynaga", parentPhone: "3171092056" },
    { name: "Aarón Santiago Monico Ornelas", phone: "3171197987", code: "3D matutino", amount: 480, nss: "18240900110", parent: "Fatima Noemí Ornelas Ahumada", parentPhone: "3171088059" },
    { name: "Litzy Estrella Lepe Guitron", phone: "3171290211", code: "N/A", amount: 480, nss: "10210785217", parent: "Teresa Maria Guitron Castellón", parentPhone: "3171000220" },
    { name: "Omar Aldair Flores Aceves", phone: "3151255759", code: "1B matutino", amount: 480, nss: "4088304284", parent: "Óscar Omar Flores cuevas", parentPhone: "3151089743" },
    { name: "Fanny Guzmán Gonzales", phone: "3173819207", code: "3A matutino", amount: 480, nss: "19240998062", parent: "Manuel Guzmán Castañeda", parentPhone: "3171082820" },
    { name: "Oscar Rolando Villa Rentería", phone: "3171295133", code: "1A matutino", amount: 480, nss: "25251059439", parent: "Teresa Rentería Vázquez", parentPhone: "3171295133" },
    { name: "Axel Fernando Álvarez Zavalza", phone: "3171315998", code: "2B vespertino", amount: 480, nss: "3240871008", parent: "Ana Beatriz Zavalza Cruz", parentPhone: "3171115998" },
    { name: "Carlos Monico Solórzano", phone: "3171008827", code: "5C matutino", amount: 480, nss: "2220862946", parent: "Juan Carlos Monico Jiménez", parentPhone: "3173870704" },
    { name: "Adilene Saraí Villafaña Gonzales", phone: "3171068710", code: "3C vespertino", amount: 480, nss: "58230862557", parent: "Norma Cecilia Gonzales Aguirre", parentPhone: "3171112265" },
    { name: "Ángel Rubalcava Vivar", phone: "3171064361", code: "2B vespertino", amount: 480, nss: "25240953239", parent: "Ashley Carolina Vibar Ibarra", parentPhone: "3171194014" },
    { name: "Román Uriel García Viramontes", phone: "3171125947", code: "3B vespertino", amount: 480, nss: "80966630628", parent: "María Guadalupe Viramontes", parentPhone: "3173814171" },
    { name: "Dianne Paola Díaz Cisneros", phone: "3173872344", code: "1B vespertino", amount: 480, nss: "4148800651", parent: "Gabriela Cisneros", parentPhone: "3171009406" },
    { name: "Camila Guadalupe González Guitierrez", phone: "3171204323", code: "3B vespertino", amount: 480, nss: "19240990259", parent: "Griselda Guitierrez Palomo", parentPhone: "3171192132" },
    { name: "Maria Fernanda Pérez Robles", phone: "3171317395", code: "3B vespertino", amount: 480, nss: "44149379289", parent: "Fatima robles Rodríguez", parentPhone: "3171003708" },
    { name: "Kristal Marisol Elias Lepe", phone: "3339796853", code: "3B vespertino", amount: 480, nss: "4998402186", parent: "Irene Lepe Aguilar", parentPhone: "3171019550" },
    { name: "Daffne Estefanía Ávalos Arechiga", phone: "3171046386", code: "3B vespertino", amount: 480, nss: "8240951854", parent: "Claudia Elizabeth Arechiga flores", parentPhone: "3171212031" },
    { name: "Maria Guadalupe Rodriguez Lopez Jimenez", phone: "3171057800", code: "5C vespertino", amount: 480, nss: "5230876848", parent: "Ismael Rodríguez Canal", parentPhone: "3171080746" },
    { name: "Danilo Agustin Castillo Diaz", phone: "3171063803", code: "5D vespertino", amount: 480, nss: "59230805893", parent: "Karen Lizbeth Diaz Brambila", parentPhone: "3171168107" },
    { name: "Diego Alberto Ruiz Nava", phone: "3171135386", code: "5C vespertino", amount: 480, nss: "18230885693", parent: "Lucia Nava Carvajal", parentPhone: "3171056291" },
    { name: "Diego Alejandro Garay De Alba", phone: "3171085213", code: "1B matutino", amount: 480, nss: "5201016878", parent: "Esmeralda", parentPhone: "3171064407" },
    { name: "Esmeralda González Gómez", phone: "3178736049", code: "3C matutino", amount: 480, nss: "19240962472", parent: "Federico Manuel Gonzales Sandoval", parentPhone: "3171006407" },
    { name: "Alison Naomi Rodriguez Alvarez", phone: "3171080060", code: "4A vespertino", amount: 480, nss: "19230895476", parent: "Héctor Rodríguez Contreras", parentPhone: "3173881547" },
    { name: "Regina Guzmán Gonzales", phone: "3171233583", code: "4C matutino", amount: 480, nss: "10230804972", parent: "Libia Piedad Gonzales Sandoval", parentPhone: "3171087881" },
    { name: "Jatzi Guadalupe Chávez Duque", phone: "3171192342", code: "3A matutino", amount: 480, nss: "18240908782", parent: "Lanci Amapola Duque Zepeda", parentPhone: "3331838162" },
    { name: "Carlos Daniel Franco Melendez", phone: "3171013724", code: "3B matutino", amount: 480, nss: "17240993539", parent: "Claudia Daniela Meléndez Rodriguez", parentPhone: "3171212394" },
    { name: "Blanca Stephanie Grajeda Gil", phone: "3171096724", code: "1D matutino", amount: 480, nss: "10251010863", parent: "Héctor Miguel Grajeda Partida", parentPhone: "3173880100" },
    { name: "Aleck Dominic Rodriguez Santana", phone: "3171093374", code: "3D matutino", amount: 480, nss: "56977726241", parent: "Lizeth Azucena Santana Montes", parentPhone: "3171091313" },
    { name: "Andrea Yamilet Salazar Ramírez", phone: "3171087227", code: "5A Vespertino", amount: 480, nss: "19230728099", parent: "Juana Patricia Ramírez Michel", parentPhone: "3171045431" },
    { name: "Carlos Manuel García García", phone: "3171002102", code: "3B matutino", amount: 480, nss: "5240987114", parent: "Lorena García Covarrubias", parentPhone: "3411179493" },
    { name: "Dulce Elizabeth Arreola López", phone: "3171234067", code: "4A vespertino", amount: 480, nss: "3230886081", parent: "Nora López García", parentPhone: "3171118083" },
    { name: "Aylin Roberta Ramos Mejía", phone: "3171282184", code: "221430749", amount: 480, nss: "N/A", parent: "N/A", parentPhone: "N/A" }
];

// CAMIÓN 3 (IKER)
const OFFICIAL_LIST_C3 = [
    { name: "Akeimy Yeraldi Mancilla Isidro", phone: "3171067689", amount: 480, code: "225519169", nss: "26251059940", parent: "Martha Angélica Isidro Medina", parentPhone: "3173877188" },
    { name: "Kimberly Mileny Nolasco García", phone: "3171131744", amount: 480, code: "225520416", nss: "8251099696", parent: "Mayra Lizbeth García boyzo", parentPhone: "3171123507" },
    { name: "Angeline Itzayana Terrones Chávez", phone: "3171314860", amount: 480, code: "225520645", nss: "1725104740-7", parent: "Karla Lizbeth Chávez Meraz", parentPhone: "317127065" },
    { name: "Ximena Alejandra Contreras Ponce", phone: "3171238874", amount: 480, code: "225518896", nss: "4988192094", parent: "Tania Guadalupe partida montes", parentPhone: "3171056214" },
    { name: "Camila Dévora", phone: "3339117462", amount: 480, code: "223442264", nss: "0323082708-5", parent: "Gloria Lorena Quintana flores", parentPhone: "3171312067" },
    { name: "Dylan Gael Corona Méndez", phone: "3173896894", amount: 480, code: "223441764", nss: "2230808665", parent: "Patricia Méndez Ortega", parentPhone: "317104836" },
    { name: "Helena García Martínez", phone: "3171297602", amount: 480, code: "223440156", nss: "10230890922", parent: "Cecilia Martínez Velazco", parentPhone: "3211007752" },
    { name: "Sebastián García Martínez", phone: "3171124602", amount: 480, code: "223440164", nss: "10230890914", parent: "Celia Martínez Velasco", parentPhone: "3211007752" },
    { name: "Dana Isabel Pérez Santana", phone: "3411771355", amount: 480, code: "223441632", nss: "5923080464", parent: "María Isabel Santana Pérez", parentPhone: "3171039329" },
    { name: "Miriam Judith Cisneros Reyes", phone: "3173891418", amount: 480, code: "223442663", nss: "60230859443", parent: "Miriam reyes hernandez", parentPhone: "3171059591" },
    { name: "Jonathan Emmanuel González Gálvez", phone: "3171043835", amount: 480, code: "223013681", nss: "18220735247", parent: "Fabiola Gálvez", parentPhone: "3171003498" },
    { name: "María Esther Chávez Sandoval", phone: "3171287144", amount: 480, code: "223011972", nss: "3220781961", parent: "Esther Sandoval", parentPhone: "3171047081" },
    { name: "Angélica Ariadna Gómez Moranchel", phone: "3171072106", amount: 480, code: "223014068", nss: "823076425", parent: "Esmeralda Nohemí moranchel ruiz", parentPhone: "3173836056" },
    { name: "Fátima Moreno de Jesús", phone: "3171286643", amount: 480, code: "223014653", nss: "12160758079", parent: "Ana María de Jesús Vite", parentPhone: "3171282540" },
    { name: "José Manuel Arreola Díaz", phone: "3173872370", amount: 480, code: "223441985", nss: "54826278456", parent: "José Luis Arreloa Zavalza", parentPhone: "3173871028" },
    { name: "Renata Luna Ureña", phone: "3325109440", amount: 480, code: "N/A", nss: "N/A", parent: "N/A", parentPhone: "N/A" },
    { name: "Zeus irán Lara Gabriel", phone: "3171084384", amount: 480, code: "223441667", nss: "60230870218", parent: "Guadalupe Gabriel Pérez", parentPhone: "3172886313" },
    { name: "Christian Daniel Ruiz Saldaña", phone: "3171205135", amount: 480, code: "223443414", nss: "823083379", parent: "Alma Griselda Saldaña moreno", parentPhone: "3171113311" },
    { name: "Rubi Castellón Pérez", phone: "3171093801", amount: 480, code: "224429318", nss: "44250992201", parent: "Azucena Pérez", parentPhone: "3171193258" },
    { name: "Hanna Kareli Yamilet López Hernández", phone: "3178731120", amount: 480, code: "224430952", nss: "5240989482", parent: "Miguel Ángel López Gómez", parentPhone: "3171314469" },
    { name: "Alondra María García Sánchez", phone: "3171283147", amount: 480, code: "224865134", nss: "17240936769", parent: "Rosa lidia Sánchez Ortega", parentPhone: "3171008352" },
    { name: "Astrid Martínez Beltrán", phone: "3171058492", amount: 480, code: "224427072", nss: "31007609154", parent: "Isela Beltrán leon", parentPhone: "3171022355" },
    { name: "Jesús López Campos", phone: "3320190233", amount: 480, code: "223442728", nss: "8230836333", parent: "Felipa Leticia campos Gutiérrez", parentPhone: "3171052000" },
    { name: "Kimberly Fátima Rodríguez Trujillo", phone: "3171066325", amount: 480, code: "223443619", nss: "60230835633", parent: "Irma Verónica Trujillo castro", parentPhone: "3173886817" },
    { name: "Cristina Itzel Pérez Pérez", phone: "3171205047", amount: 480, code: "224080943", nss: "0323088654-5", parent: "Miriam Elizabeth Pérez moran", parentPhone: "3173850876" },
    { name: "Evelyn Yoselin Vázquez Ortega", phone: "4491235827", amount: 480, code: "223441748", nss: "18230808497", parent: "María Azucena Ortega tapia", parentPhone: "4499061731" },
    { name: "Selene Ruby Téllez Baltazar", phone: "3317143526", amount: 480, code: "223441179", nss: "17230854956", parent: "Mariela Baltazar Zúñiga", parentPhone: "3173891593" },
    { name: "Edna Citlalli Reyna Ayala", phone: "3171318696", amount: 480, code: "2234434406", nss: "5923082680", parent: "María Edith Ayala moran", parentPhone: "317116076" },
    { name: "Jorge Márquez Loera", phone: "3171234031", amount: 480, code: "224427951", nss: "19240903393", parent: "Ana Liliana Muñoz Pérez", parentPhone: "3171124191" },
    { name: "Lucio Isac Sandoval Quintero", phone: "3171055683", amount: 480, code: "224427137", nss: "0403750889-4", parent: "José Rogelio Sandoval Hernández", parentPhone: "3173884154" },
    { name: "Darío Gómez Rivera", phone: "3171215534", amount: 480, code: "224428532", nss: "7500823935", parent: "Nieva Teresita rivera hueso", parentPhone: "3171056618" },
    { name: "Juan Pablo Rodríguez Pelayo", phone: "3171318561", amount: 480, code: "224428524", nss: "30250990816", parent: "María Isabel Pelayo cobian", parentPhone: "3178732644" },
    { name: "Dante Sedano", phone: "3171038271", amount: 480, code: "225198603", nss: "75977501560", parent: "Elizabeth García rojas", parentPhone: "3171085242" },
    { name: "Osmar Alejandro Méndez Ibarra", phone: "3173896781", amount: 480, code: "N/A", nss: "N/A", parent: "N/A", parentPhone: "N/A" },
    { name: "Baldwin Alexander Rodríguez Hernández", phone: "3173886218", amount: 480, code: "225201299", nss: "4027737156", parent: "Iván Rodríguez", parentPhone: "3171210596" },
    { name: "Marcos Zavalza Medina", phone: "N/A", amount: 480, code: "221431036", nss: "32110697854", parent: "José Salvador Zavalza", parentPhone: "3171041852" },
    { name: "Camila Anahí Torres Montes", phone: "3171283203", amount: 480, code: "223443252", nss: "10230804048", parent: "Octavio César torres gomez", parentPhone: "3173883500" },
    { name: "Karol Gabriela Robles Uribe", phone: "3171010251", amount: 480, code: "223443929", nss: "6023083445-3", parent: "Ricardo robles castillo", parentPhone: "3173886055" },
    { name: "Nahomi Dayan Núñez Sánchez", phone: "3178734986", amount: 480, code: "224427129", nss: "35250950421", parent: "Ana Gabriela Sánchez Sánchez", parentPhone: "3173833784" },
    { name: "Milton Santiago López Guerrero", phone: "3171070966", amount: 480, code: "223443686", nss: "0401720401-9", parent: "Roberto López Cázares", parentPhone: "3173889949" },
    { name: "Iliana Valentina Rodríguez", phone: "3173851141", amount: 480, code: "223441608", nss: "25230806066", parent: "Gustavo Rodriguez Gómez", parentPhone: "3171049390" },
    { name: "Diego Alejandro Mancilla García", phone: "3171128601", amount: 480, code: "225201213", nss: "54927417870", parent: "Alma Delia García torres", parentPhone: "3171079116" },
    { name: "Abner Enríquez Casillas", phone: "+1 8185248474", amount: 300, code: "N/A", nss: "N/A", parent: "N/A", parentPhone: "N/A" },
    { name: "Paola Sánchez Soltero", phone: "3171292143", code: "224430405", amount: 480, nss: "18240947020", parent: "Karla maravilla soltero mata", parentPhone: "3171292144" },
    { name: "Iker Steve Soltero Rodríguez", phone: "3171041444", code: "221003476", amount: 480, nss: "N/A", parent: "N/A", parentPhone: "N/A" }
];

const BUSES = [
    { 
        id: 1, 
        label: "Camión 1", 
        color: "from-orange-500 to-orange-700", 
        text: "text-orange-600", 
        bg: "bg-orange-100",
        coordinator: { name: "Samuel Méndez Vidrio", phone: "3125950081" },
        list: OFFICIAL_LIST_C1
    },
    { 
        id: 2, 
        label: "Camión 2", 
        // CAMBIO: Verde/Amarillo compatible con la gama cálida
        color: "from-green-500 to-yellow-600", 
        text: "text-green-700", 
        bg: "bg-green-100",
        coordinator: { name: "Aylin R. Ramos Mejía", phone: "3171282184" },
        list: OFFICIAL_LIST_C2
    },
    { 
        id: 3, 
        label: "Camión 3", 
        // CAMBIO: Rojo/Rosa (Fucsia) compatible con la gama cálida (Naranja -> Rojo)
        color: "from-red-500 to-pink-600", 
        text: "text-red-700", 
        bg: "bg-red-100",
        coordinator: { name: "Iker S Soltero Rodríguez", phone: "3171041444" },
        list: OFFICIAL_LIST_C3
    }
];

const App = () => {
  // --- TÍTULO DE LA PESTAÑA ---
  useEffect(() => {
    document.title = "Unión Estudiantil - FIL 2025";
  }, []);

  // --- AUTENTICACIÓN COORDINADOR Y USUARIO ---
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem('fil2025_user') || null;
  });
  
  // Access Level: null (viewer), 1 (Bus1), 2 (Bus2), 3 (Bus3)
  const [userBusAccess, setUserBusAccess] = useState(() => {
      const stored = localStorage.getItem('fil2025_bus_access');
      return stored ? parseInt(stored) : null;
  });
    
  // Si hay un usuario, es coordinador
  const isCoordinator = !!currentUser;

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // TICKET MODAL STATE
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  // AUTH MODAL STATE
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTargetId, setAuthTargetId] = useState(null);
  
  // States for double verification
  const [authCodeInput, setAuthCodeInput] = useState('');
  const [authPhoneInput, setAuthPhoneInput] = useState('');

  // DELETE DOCUMENT CONFIRMATION STATE (Reemplaza deleteLetterId)
  const [documentToDelete, setDocumentToDelete] = useState(null); // { passengerId, docUrl, docName }

  // BUS STATE
  const [currentBus, setCurrentBus] = useState(1);

  // MAP LIST TOGGLE STATE (NEW)
  const [mapListMode, setMapListMode] = useState('unassigned'); // 'unassigned' | 'assigned'

  // Force Bus View on Login
  useEffect(() => {
      if (isCoordinator && userBusAccess) {
          setCurrentBus(userBusAccess);
      }
  }, [isCoordinator, userBusAccess]);

  const handleLogin = (e) => {
    e.preventDefault();
    
    let name = '';
    let accessLevel = null;
    let valid = false;

    // Credenciales
    // Samuel - Bus 1
    if (loginUser === '223440784' && loginPass === 'samumv367') {
        name = "Samuel M.";
        accessLevel = 1;
        valid = true;
    }
    // Aylin - Bus 2
    else if (loginUser === '221430749' && loginPass === 'Prinsess123') {
        name = "Aylin R.";
        accessLevel = 2;
        valid = true;
    }
    // Iker - Bus 3
    else if (loginUser === '221003476' && loginPass === 'Iker0202') {
        name = "Iker S.";
        accessLevel = 3;
        valid = true;
    }
    // Francisco (Legacy/Backup - Bus 1)
    else if (loginUser.toLowerCase() === 'francisco' && loginPass === 'fil2025') {
        name = "Francisco P.";
        accessLevel = 1;
        valid = true;
    }

    if (valid) {
      setCurrentUser(name);
      setUserBusAccess(accessLevel);
      localStorage.setItem('fil2025_user', name);
      localStorage.setItem('fil2025_bus_access', accessLevel);
      
      setShowLoginModal(false);
      setLoginError('');
      setLoginUser(''); setLoginPass('');
      
      // Immediate redirect to assigned bus
      setCurrentBus(accessLevel);
      showNotification(`Bienvenido, ${name}. Acceso al Camión ${accessLevel}`);
    } else {
      setLoginError('Credenciales incorrectas');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserBusAccess(null);
    localStorage.removeItem('fil2025_user');
    localStorage.removeItem('fil2025_bus_access');
  };

  const triggerLogin = () => {
    setShowLoginModal(true);
    setLoginError('');
  };

  // Check Permission Helper
  // Un usuario SÓLO puede editar si es coordinador Y si el bus del pasajero es su bus asignado.
  const canEdit = (targetBusId) => {
      if (!isCoordinator) return false;
      if (userBusAccess && userBusAccess !== (targetBusId || 1)) return false;
      return true;
  };

  // Re-define esta función para que verifique si el bus del pasajero coincide con el bus del coordinador
  const verifyPermissionAction = (targetBusId) => {
      if (!canEdit(targetBusId)) {
          showNotification(`Solo tienes permiso para editar el Camión ${userBusAccess}`, 'error');
          return false;
      }
      return true;
  };

  // --- LÓGICA DE DATOS CON SUPABASE (Script Injection) ---
  const [supabase, setSupabase] = useState(null);
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Helper para parsear la columna letter_url como un array de documentos
  const parseDocuments = (letterUrl) => {
      if (!letterUrl) return [];
      try {
          const docs = typeof letterUrl === 'string' ? JSON.parse(letterUrl) : letterUrl;
          return Array.isArray(docs) ? docs : [];
      } catch (e) {
          // Si falla el parseo, probablemente solo era una URL antigua o 'null'
          return typeof letterUrl === 'string' && letterUrl.startsWith('http') ? [{ name: 'Documento Antiguo', url: letterUrl, legacy: true }] : [];
      }
  };


  // 1. Cargar el script de Supabase
  useEffect(() => {
    if (window.supabase) {
      const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      setSupabase(client);
      return;
    }

    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    script.async = true;
    script.onload = () => {
      if (window.supabase) {
        const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        setSupabase(client);
      }
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup opcional
    };
  }, []);

  // 2. Usar Supabase cuando esté listo
  useEffect(() => {
    if (!supabase) return;

    fetchPassengers();
    const channel = supabase
      .channel('table-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'passengers' },
        (payload) => {
            let updatedPassenger = payload.new;
            
            // Asegurar que el campo documents se actualice desde letter_url
            if (updatedPassenger && updatedPassenger.letter_url !== undefined) {
                updatedPassenger.documents = parseDocuments(updatedPassenger.letter_url);
            }

            if (payload.eventType === 'INSERT') {
                setPassengers((prev) => [...prev, updatedPassenger]);
            } else if (payload.eventType === 'DELETE') {
                setPassengers((prev) => prev.filter((p) => p.id !== payload.old.id));
            } else if (payload.eventType === 'UPDATE') {
                // MERGE SEAT DATA FROM LOCAL STORAGE IF PAYLOAD HAS NO SEAT (Safety)
                const localSeats = JSON.parse(localStorage.getItem('fil2025_local_seats') || '{}');
                if (updatedPassenger.seat_number === null && localSeats[updatedPassenger.id]) {
                    updatedPassenger.seat_number = localSeats[updatedPassenger.id];
                }
                setPassengers((prev) => prev.map((p) => (p.id === payload.new.id ? updatedPassenger : p)));
            }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const fetchPassengers = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('passengers')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error cargando:', error);
      showNotification("Error conectando a Supabase. ¿RLS?", "error");
    } else {
      // 1. Mapear y parsear documentos para el estado local (documents array)
      const localSeats = JSON.parse(localStorage.getItem('fil2025_local_seats') || '{}');
      const mergedData = data.map(p => ({
          ...p,
          seat_number: p.seat_number !== null ? p.seat_number : (localSeats[p.id] || null),
          documents: parseDocuments(p.letter_url), // Usar el helper de parseo
      }));
      setPassengers(mergedData);
    }
    setLoading(false);
  };

  // --- FUNCIÓN DE EMERGENCIA PARA CARGAR LISTA ---
  const handleRestoreList = async () => {
    if(!isCoordinator) {
        triggerLogin();
        return;
    }
    // Determine which bus to restore
    const busToRestore = currentBus;
    
    if(!verifyPermissionAction(busToRestore)) return; 

    if (!supabase) return;

    if(!window.confirm(`¿ESTÁS SEGURO? Esto subirá la lista oficial del Camión ${busToRestore} a la base de datos.`)) return;

    const busConfig = BUSES.find(b => b.id === busToRestore);
    if (!busConfig || busConfig.list.length === 0) {
        showNotification(`No hay lista oficial definida para el Camión ${busToRestore}`, 'error');
        return;
    }

    setUploading(true);
    
    const records = busConfig.list.map(p => ({
      name: p.name,
      phone: p.phone,
      code: p.code,
      amount: p.amount,
      nss: p.nss || 'N/A',
      parent: p.parent || 'N/A',
      parent_phone: p.parentPhone || 'N/A',
      checks: [false, false, false],
      times: [null, null, null],
      // Nuevo campo inicial: array de documentos serializado
      letter_url: JSON.stringify([]), 
      ticket_released: false,
      bus_id: busToRestore
    }));

    const { error } = await supabase.from('passengers').insert(records);
    
    if (error) {
        showNotification("Error al restaurar lista: " + error.message, "error");
    } else {
        showNotification("¡Lista restaurada con éxito!", 'success');
        fetchPassengers();
    }
    setUploading(false);
  };

  // --- HELPER: AUTO-ADD COORDINATOR IF MISSING ---
  const addCoordinatorIfMissing = async () => {
      if (!supabase || !isCoordinator) return;
      
      // Auto add only to assigned bus
      const targetBus = userBusAccess || 1;
      const meName = currentUser === "Samuel M." ? "Samuel Méndez Vidrio" : (currentUser === "Aylin R." ? "Aylin R. Ramos Mejía" : "Iker S Soltero Rodríguez");
      
      const exists = passengers.find(p => p.name === meName && (p.bus_id || 1) === targetBus);
      
      if (!exists) {
          if(window.confirm(`Tu usuario (${meName}) no está en la lista del Camión ${targetBus}. ¿Quieres agregarte?`)) {
               const newPassenger = {
                  name: meName,
                  phone: "N/A",
                  code: "ADMIN",
                  amount: 480,
                  nss: "N/A",
                  parent: "N/A",
                  parent_phone: "N/A",
                  checks: [false, false, false],
                  times: [null, null, null],
                  seat_number: null,
                  letter_url: JSON.stringify([]), // Nuevo campo inicial
                  ticket_released: false,
                  bus_id: targetBus
                };
                const { error } = await supabase.from('passengers').insert([newPassenger]);
                if (!error) showNotification("Te has agregado a la lista correctamente");
          }
      } else {
          showNotification(`Ya estás en la lista del C${targetBus}.`);
      }
  };

  // --- UI STATE ---
  const [filterLeg, setFilterLeg] = useState(null);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newNss, setNewNss] = useState('');
  const [newParent, setNewParent] = useState('');
  const [newParentPhone, setNewParentPhone] = useState('');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Sorting State
  const [sortMode, setSortMode] = useState('original'); // 'original', 'alpha', 'lastname'

  // MODAL EDIT STATE
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  // BUS MAP STATE
  const [showBusMap, setShowBusMap] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null); // The seat number user clicked on
  const [seatSearchTerm, setSeatSearchTerm] = useState(''); // NEW: Seat search

  // NOTIFICATION SYSTEM
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type, visible: true });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  const legs = [
    { id: 0, label: "Salida Autlán", sub: "→ FIL", icon: <Bus size={14} />, short: "Ida" },
    { id: 1, label: "Salida FIL", sub: "→ Plaza", icon: <MapPin size={14} />, short: "Inter" },
    { id: 2, label: "Regreso Plaza", sub: "→ Autlán", icon: <RotateCcw size={14} />, short: "Regreso" }
  ];

  // --- HELPERS FOR LOCAL STORAGE ---
  const saveLocalSeat = (passengerId, seatNum) => {
      const localSeats = JSON.parse(localStorage.getItem('fil2025_local_seats') || '{}');
      if (seatNum === null) {
          delete localSeats[passengerId];
      } else {
          localSeats[passengerId] = seatNum;
      }
      localStorage.setItem('fil2025_local_seats', JSON.stringify(localSeats));
  };

  // --- ACTIONS ---

  const addPassenger = async (e) => {
    e.preventDefault();
    if (!isCoordinator) { triggerLogin(); return; }
    
    // PERMISSION CHECK
    if (!verifyPermissionAction(currentBus)) return;

    if (!supabase) return;
    if (!newName.trim()) return;

    const newPassenger = {
      name: newName.trim(),
      phone: newPhone.trim() || 'N/A',
      code: newCode.trim() || 'N/A',
      amount: newAmount ? parseFloat(newAmount) : 0,
      nss: newNss.trim() || 'N/A',
      parent: newParent.trim() || 'N/A',
      parent_phone: newParentPhone.trim() || 'N/A',
      checks: [false, false, false],
      times: [null, null, null],
      // Actualizado para manejar el array serializado
      letter_url: JSON.stringify([]), 
      ticket_released: false,
      bus_id: currentBus // Asigna al camión actual
    };

    const { error } = await supabase.from('passengers').insert([newPassenger]);
    if (!error) showNotification(`Pasajero agregado al Camión ${currentBus}`);
    
    setNewName(''); setNewPhone(''); setNewCode(''); setNewAmount(''); setNewNss(''); setNewParent(''); setNewParentPhone('');
    setShowAddForm(false);
  };

  const removePassenger = async (id) => {
    if (!isCoordinator) { triggerLogin(); return; }
    
    // Get passenger to check permissions
    const passenger = passengers.find(p => p.id === id);
    // Verificar que el ID del bus coincida con el acceso del coordinador
    if (!passenger || !verifyPermissionAction(passenger.bus_id || 1)) return;

    if (!supabase) return;
    // NOTE: Removed window.confirm due to mandate constraints on modal usage, but using simple confirm for code brevity here.
    if (window.confirm('¿Seguro que quieres eliminar a esta persona?')) {
      await supabase.from('passengers').delete().eq('id', id);
      showNotification("Pasajero eliminado", "error");
      setShowEditModal(false);
    }
  };

  const handleEditClick = (passenger) => {
    if (!isCoordinator) { 
        showNotification("Acceso denegado. Solo coordinadores.", "error"); 
        return; 
    }
    
    // Si el coordinador no tiene permiso para editar este camión, solo abrimos el modal para verlo,
    // pero el botón de guardar estará deshabilitado (lógica implementada dentro del modal).
    // NOTA: Mantenemos la lógica de verificación aquí para la UI en caso de que se intente editar desde un bus equivocado.
    if (!canEdit(passenger.bus_id)) {
      showNotification(`Solo tienes permiso para editar el Camión ${userBusAccess}`, 'error');
    }

    // Crear una copia del pasajero para edición, asegurando que documents se mapee a letter_url para el guardado.
    setEditFormData({ ...passenger, letter_url: JSON.stringify(passenger.documents || []) }); 
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: name === 'amount' ? parseFloat(value) || 0 : value });
  };

  const handleSaveEdit = async () => {
    if (!supabase) return;
    
    // PERMISSION CHECK - ESTRICTO ANTES DE GUARDAR
    const targetBus = editFormData.bus_id || 1;
    if (!verifyPermissionAction(targetBus)) return;

    const { id, seat_number, documents, ...dataToUpdate } = editFormData; // Excluir documents del payload
    await supabase.from('passengers').update(dataToUpdate).eq('id', id);
    showNotification("Información actualizada");
    setShowEditModal(false);
  };

  const handleLocalAmountChange = (id, newVal) => {
    setPassengers(prev => prev.map(p => p.id === id ? { ...p, amount: newVal } : p));
  };

  const handleAmountBlur = async (id, newVal) => {
    if (!supabase) return;
    
    const passenger = passengers.find(p => p.id === id);
    if (!passenger) return;
    
    // PERMISSION CHECK - ESTRICTO ANTES DE GUARDAR
    if (!verifyPermissionAction(passenger.bus_id || 1)) {
        fetchPassengers(); // Revert local change
        return;
    }

    const amount = parseFloat(newVal) || 0;
    await supabase.from('passengers').update({ amount }).eq('id', id);
    showNotification(`Pago actualizado: $${amount}`);
  };
    
  const toggleCheck = async (id, legIndex) => {
    if (!isCoordinator) { triggerLogin(); return; }
    if (!supabase) return;
    
    const passenger = passengers.find(p => p.id === id);
    if (!passenger) return;

    // PERMISSION CHECK - ESTRICTO ANTES DE GUARDAR
    if (!verifyPermissionAction(passenger.bus_id || 1)) return;

    const isChecking = !passenger.checks[legIndex];
    const newChecks = [...passenger.checks];
    newChecks[legIndex] = isChecking;
    
    const newTimes = [...(passenger.times || [null, null, null])];
    if (isChecking) {
      const now = new Date();
      newTimes[legIndex] = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    } else {
      newTimes[legIndex] = null;
    }

    await supabase.from('passengers').update({ checks: newChecks, times: newTimes }).eq('id', id);
  };

  // --- CARTA / TICKET ACTIONS ---

  const handleUploadLetter = async (e, passengerId) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !supabase) return;
    if (files.length > 5) {
        showNotification("Límite de 5 archivos por carga.", "error");
        return;
    }

    // No se requiere permiso de coordinador para subir archivos (esto lo hace el pasajero).
    setLoading(true);
    const passenger = passengers.find(p => p.id === passengerId);
    if (!passenger) {
        setLoading(false);
        return;
    }

    let currentDocuments = passenger.documents || [];
    const filesToUpload = Array.from(files);
    let uploadedDocuments = [];

    for (const file of filesToUpload) {
        // Validación de tipo (opcional, Supabase storage lo controla)
        if (!file.type.match('image.*|application/pdf')) {
            showNotification(`Archivo ${file.name} no es una imagen o PDF.`, "error");
            continue;
        }

        const fileExt = file.name.split('.').pop();
        // Usar timestamp + random para asegurar nombre único
        const fileName = `${passengerId}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}.${fileExt}`;
        const filePath = `${fileName}`;

        // 1. Upload file to 'letters' bucket
        const { error: uploadError } = await supabase.storage
            .from('letters')
            .upload(filePath, file);

        if (uploadError) {
            console.error(uploadError);
            showNotification(`Error al subir ${file.name}: ${uploadError.message}`, "error");
            continue; 
        }

        // 2. Get Public URL
        const { data: { publicUrl } } = supabase.storage.from('letters').getPublicUrl(filePath);

        uploadedDocuments.push({
            name: file.name,
            url: publicUrl,
            timestamp: new Date().toISOString()
        });
    }
    
    // Merge new documents with existing ones
    const newDocuments = [...currentDocuments, ...uploadedDocuments];
    const newDocumentsJson = JSON.stringify(newDocuments);

    // 3. Update Passenger Record
    const { error: dbError } = await supabase
        .from('passengers')
        // Usar letter_url para el campo en la base de datos, con la data serializada.
        .update({ letter_url: newDocumentsJson }) 
        .eq('id', passengerId);

    if (dbError) {
        console.error(dbError);
        showNotification("Error guardando enlaces en base de datos", "error");
    } else {
        // Optimistically update local state immediately (the live channel will also update it)
        setPassengers(prev => prev.map(p => (p.id === passengerId ? { ...p, documents: newDocuments } : p)));
        showNotification(`${uploadedDocuments.length} documento(s) subido(s) correctamente`);
    }
    setLoading(false);
  };

  const confirmDeleteDocument = async () => {
    const docInfo = documentToDelete;
    if (!docInfo || !supabase) return;
    
    setDocumentToDelete(null); // Cerrar modal

    const passenger = passengers.find(p => p.id === docInfo.passengerId);
    // PERMISSION CHECK - ESTRICTO ANTES DE GUARDAR
    if (!passenger || !verifyPermissionAction(passenger.bus_id || 1)) return;

    // Filtrar el documento a eliminar
    const newDocuments = (passenger.documents || []).filter(doc => doc.url !== docInfo.docUrl);
    const newDocumentsJson = JSON.stringify(newDocuments);

    // Actualizar el registro del pasajero
    const { error: dbError } = await supabase
        .from('passengers')
        .update({ 
            letter_url: newDocumentsJson, 
            // Si no quedan documentos, revocamos el ticket_released (medida de seguridad)
            ticket_released: newDocuments.length > 0 ? passenger.ticket_released : false 
        })
        .eq('id', docInfo.passengerId);
    
    if(dbError) {
        showNotification("Error al eliminar referencia del documento", "error");
        fetchPassengers(); // Revertir en caso de error
    } else {
        showNotification(`Documento "${docInfo.docName}" eliminado`, "error");
    }
  };


  const toggleTicketRelease = async (passengerId, currentStatus) => {
      if(!isCoordinator) return;
      if (!supabase) return;
      
      const passenger = passengers.find(p => p.id === passengerId);
      if (!passenger) return;

      // PERMISSION CHECK - ESTRICTO ANTES DE GUARDAR
      if (!verifyPermissionAction(passenger.bus_id || 1)) return;
      
      // Bloquear si intenta liberar sin documentos
      if (!currentStatus && (!passenger.documents || passenger.documents.length === 0)) {
           showNotification("¡No puedes liberar el boleto! No hay documentos subidos.", "error");
           return;
      }

      const { error } = await supabase
        .from('passengers')
        .update({ ticket_released: !currentStatus })
        .eq('id', passengerId);

      if(!error) {
          showNotification(!currentStatus ? "Boleto LIBERADO" : "Boleto BLOQUEADO");
      }
  };

  const openTicketModal = (passenger) => {
      setTicketData(passenger);
      setShowTicketModal(true);
  };

  // --- IDENTITY VERIFICATION (DUAL FACTOR: CODE & PHONE) ---
  const handleVerifyIdentity = (e) => {
      e.preventDefault();
      const target = passengers.find(p => p.id === authTargetId);
      if (!target) return;

      // Determinar si el usuario tiene código
      const hasCode = target.code && target.code !== 'N/A' && target.code !== 'Pendiente';
      let isValid = false;

      // Limpiar inputs
      const phoneInputClean = authPhoneInput.replace(/\D/g, '');
      const targetPhoneClean = (target.phone || '').replace(/\D/g, '');

      if (hasCode) {
          // Requiere AMBOS: Código y Teléfono
          const codeMatch = authCodeInput.trim().toLowerCase() === target.code.trim().toLowerCase();
          const phoneMatch = phoneInputClean.length > 6 && phoneInputClean === targetPhoneClean;
          
          if (codeMatch && phoneMatch) {
              isValid = true;
          } else {
              // Mensaje genérico de error por seguridad
              showNotification("Datos incorrectos. Por favor verifica tu información.", "error");
              return; // Detener si falla alguno
          }
      } else {
          // Solo Teléfono (Fallback)
          if (phoneInputClean.length > 6 && phoneInputClean === targetPhoneClean) {
              isValid = true;
          } else {
              showNotification("Datos incorrectos. Verifica el número.", "error");
              return;
          }
      }

      if (isValid) {
          setShowAuthModal(false);
          setTicketData(target);
          setShowTicketModal(true);
          showNotification(`¡Bienvenido ${target.name.split(' ')[0]}!`);
          setAuthCodeInput('');
          setAuthPhoneInput('');
      }
  };

  const openAuthModal = (id) => {
      setAuthTargetId(id);
      setAuthCodeInput('');
      setAuthPhoneInput('');
      setShowAuthModal(true);
  };

  // --- SEAT MAP ACTIONS ---
  const handleSeatClick = (seatNum) => {
    // Only check occupants for CURRENT BUS
    const occupant = passengers.find(p => (p.bus_id || 1) === currentBus && p.seat_number === seatNum);

    // If seat is free and user is NOT coordinator -> Block and login
    if (!occupant && !isCoordinator) {
        showNotification("Solo coordinadores pueden asignar asientos", "error");
        triggerLogin();
        return;
    }
    
    // Permission Check for assignment intent
    if (!occupant && !canEdit(currentBus)) {
        showNotification(`Solo el encargado del Camión ${currentBus} puede asignar.`, 'error');
        return;
    }

    // If seat is occupied OR user is coordinator -> Allow selection to view details/assign
    setSelectedSeat(seatNum);
    setSeatSearchTerm(''); 
  };

  const assignSeat = async (passengerId, seatNum) => {
    if (!supabase) return;
    if (!isCoordinator) return; // Safety check
    if (!verifyPermissionAction(currentBus)) return; // Permiso para el camión actual

    const previousPassengers = [...passengers]; // Backup

    // 1. Optimistic Update (Immediate Feedback)
    setPassengers(prev => {
        return prev.map(p => {
            // Check only within CURRENT BUS
            if ((p.bus_id || 1) !== currentBus) return p;

            // Clear seat if someone else has it (in this bus)
            if (p.seat_number == seatNum) return { ...p, seat_number: null };
            // Assign seat to new person
            if (p.id === passengerId) return { ...p, seat_number: seatNum };
            return p;
        });
    });

    // 2. Try DB Update, Fallback to Local
    try {
        // Clear previous owner if any (in this bus)
        const taken = previousPassengers.find(p => (p.bus_id || 1) === currentBus && p.seat_number == seatNum);
        if (taken) {
             const { error: errorClear } = await supabase.from('passengers').update({ seat_number: null }).eq('id', taken.id);
             if (errorClear) throw errorClear;
        }

        const { error: errorAssign } = await supabase.from('passengers').update({ seat_number: seatNum }).eq('id', passengerId);
        
        if (errorAssign) throw errorAssign;

        showNotification(`Asiento ${seatNum} asignado (C${currentBus})`);

    } catch (error) {
        console.warn("Fallo guardado en nube, guardando localmente...", error);
        
        // Save to LocalStorage
        const taken = previousPassengers.find(p => (p.bus_id || 1) === currentBus && p.seat_number == seatNum);
        if(taken) saveLocalSeat(taken.id, null);
        saveLocalSeat(passengerId, seatNum);

        showNotification(`Asiento ${seatNum} guardado localmente`, 'success');
    }
    
    setSelectedSeat(null);
    setSeatSearchTerm(''); 
  };

  const releaseSeat = async (passengerId) => {
    if (!supabase) return;
    if (!isCoordinator) return; // Safety check
    if (!verifyPermissionAction(currentBus)) return;

    // Optimistic
    setPassengers(prev => prev.map(p => p.id === passengerId ? { ...p, seat_number: null } : p));
    
    try {
        const { error } = await supabase.from('passengers').update({ seat_number: null }).eq('id', passengerId);
        if (error) throw error;
        showNotification("Asiento liberado (Nube)");
    } catch(error) {
        saveLocalSeat(passengerId, null);
        showNotification("Asiento liberado (Local)", 'success');
    }
    
    setSelectedSeat(null);
  };

  // --- SORTING LOGIC ---
  const getSurname = (fullName) => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length >= 4) return parts[2];
    if (parts.length === 3) return parts[1];
    return parts[0];
  };

  const formatDisplayName = (name) => {
    if (sortMode !== 'lastname') return name;
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 4) {
       return `${parts.slice(2).join(' ')} ${parts.slice(0, 2).join(' ')}`;
    }
    if (parts.length === 3) {
       return `${parts.slice(1).join(' ')} ${parts[0]}`;
    }
    if (parts.length === 2) {
       return `${parts[1]} ${parts[0]}`;
    }
    return name;
  };

  const cycleSortMode = () => {
    if (sortMode === 'original') setSortMode('alpha');
    else if (sortMode === 'alpha') setSortMode('lastname');
    else setSortMode('original');
  };

  const getSortLabel = () => {
    if (sortMode === 'alpha') return 'A-Z (Nombre)';
    if (sortMode === 'lastname') return 'A-Z (Apellido)';
    return 'Original';
  };

  const getFirstName = (name) => {
    const parts = name.trim().split(/\s+/);
    return parts[0];
  };

  // --- RENDER ---
  // FILTER BY CURRENT BUS FIRST
  const currentBusPassengers = passengers.filter(p => (p.bus_id || 1) === currentBus);

  const filteredPassengers = currentBusPassengers.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || (p.code && p.code.includes(searchTerm));
    
    // NEW FILTER LOGIC: 'pending' vs 'reviewed' vs 'seated' vs 'no_docs' vs leg index vs null
    let matchesFilter = true;
    if (filterLeg === 'pending') {
        // Ahora verifica si hay documentos Y si el ticket NO ha sido liberado
        matchesFilter = (p.documents && p.documents.length > 0) && !p.ticket_released;
    } else if (filterLeg === 'reviewed') {
        // Verifica si hay documentos Y si el ticket YA fue liberado
        matchesFilter = (p.documents && p.documents.length > 0) && p.ticket_released;
    } else if (filterLeg === 'seated') {
        // Verifica si tiene asiento asignado
        matchesFilter = p.seat_number !== null;
    } else if (filterLeg === 'no_docs') {
        // NUEVO: Verifica si NO tiene documentos subidos
        matchesFilter = (!p.documents || p.documents.length === 0);
    } else if (filterLeg !== null) {
        matchesFilter = !p.checks[filterLeg];
    }

    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    if (sortMode === 'original') return a.id - b.id;
    if (sortMode === 'alpha') return a.name.localeCompare(b.name);
    if (sortMode === 'lastname') {
        const surnameA = getSurname(a.name);
        const surnameB = getSurname(b.name);
        return surnameA.localeCompare(surnameB);
    }
    return 0;
  });

  const getStats = (legIndex) => {
    const count = currentBusPassengers.filter(p => p.checks && p.checks[legIndex]).length;
    const total = currentBusPassengers.length;
    return { count, total, percent: total === 0 ? 0 : (count / total) * 100 };
  };

  const totalPaidFull = currentBusPassengers.filter(p => p.amount >= 480).length;
  const totalAdvance = currentBusPassengers.filter(p => p.amount > 0 && p.amount < 480).length;
  const totalPending = currentBusPassengers.filter(p => p.amount === 0).length; // Mantenemos para mostrar en la tarjeta si es coordinador
  const totalMoney = currentBusPassengers.reduce((sum, p) => sum + (p.amount || 0), 0);
  
  // --- CALCULATE CARD/SEAT FILTER COUNTS BASED ON currentBusPassengers ---
  const countPendingCards = currentBusPassengers.filter(p => p.documents && p.documents.length > 0 && !p.ticket_released).length;
  const countReviewedCards = currentBusPassengers.filter(p => p.documents && p.documents.length > 0 && p.ticket_released).length;
  const countSeated = currentBusPassengers.filter(p => p.seat_number).length;
  // NUEVO COUNT
  const countNoDocs = currentBusPassengers.filter(p => !p.documents || p.documents.length === 0).length;

  const exportToCSV = () => {
    if (!isCoordinator) { triggerLogin(); return; }
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Camion,Nombre,Monto,Teléfono,Código,NSS,Tutor,Tel. Tutor,Asiento,Documentos URL,Boleto Liberado,Autlan->FIL (Hora),FIL->Plaza (Hora),Plaza->Autlan (Hora)\n";
    // Export ALL passengers or just current bus? Typically useful to export all, but sorted by bus
    passengers.sort((a,b) => (a.bus_id||1) - (b.bus_id||1)).forEach(p => {
      const c1 = p.checks[0] ? `SI (${p.times[0]})` : 'NO';
      const c2 = p.checks[1] ? `SI (${p.times[1]})` : 'NO';
      const c3 = p.checks[2] ? `SI (${p.times[2]})` : 'NO';
      
      const docUrls = (p.documents || []).map(d => d.url).join(' | '); // Concatenar URLs
      
      const row = `C${p.bus_id||1},${p.name.replace(/,/g, '')},${p.amount||0},${p.phone||'N/A'},${p.code||'N/A'},${p.nss||'N/A'},${p.parent ? p.parent.replace(/,/g, '') : 'N/A'},${p.parent_phone||'N/A'},${p.seat_number || 'N/A'},"${docUrls}",${p.ticket_released ? 'SI' : 'NO'},${c1},${c2},${c3}`;
      csvContent += row + "\n";
    });
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `asistencia_fil_2025_completo.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getBusColor = (id) => {
      const bus = BUSES.find(b => b.id === id);
      return bus ? bus.color : "from-gray-500 to-gray-600";
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-orange-50 text-orange-600 font-bold">Cargando datos...</div>;

  return (
    <div className="min-h-screen bg-white font-sans pb-24 text-gray-800 overflow-x-hidden w-full max-w-[100vw]">
      
      {/* NOTIFICATION TOAST */}
      <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] transition-all duration-500 ease-in-out ${notification.visible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl border ${notification.type === 'error' ? 'bg-white border-red-200 text-red-600' : 'bg-white border-green-200 text-green-700'}`}>
            {notification.type === 'error' ? <ShieldAlert size={20}/> : <Check size={20} className="bg-green-100 p-0.5 rounded-full"/>}
            <span className="font-bold text-sm">{notification.message}</span>
        </div>
      </div>

      {/* DELETE DOCUMENT CONFIRMATION MODAL */}
      {documentToDelete && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[80] flex items-center justify-center p-4 animate-in fade-in">
           <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-red-100 text-center">
               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                   <Trash2 size={32}/>
               </div>
               <h3 className="text-xl font-bold text-gray-800 mb-2">¿Eliminar documento?</h3>
               <p className="text-sm text-gray-500 mb-3 font-bold truncate">"{documentToDelete.docName}"</p>
               <p className="text-sm text-gray-500 mb-6">Esta acción no se puede deshacer y puede bloquear el boleto si no quedan documentos.</p>
               <div className="flex gap-3">
                   <button onClick={() => setDocumentToDelete(null)} className="flex-1 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">Cancelar</button>
                   <button onClick={confirmDeleteDocument} className="flex-1 py-3 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30">Sí, eliminar</button>
               </div>
           </div>
        </div>
      )}

      {/* AUTH MODAL FOR PASSENGERS (DYNAMIC: CODE & PHONE) */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[80] flex items-center justify-center p-4 animate-in fade-in">
           <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-orange-100 text-center relative">
               <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full hover:bg-gray-200"><X size={20}/></button>
               
               {(() => {
                   const target = passengers.find(p => p.id === authTargetId);
                   // Lógica para decidir qué pedir: Si tiene código válido, pide ambos. Si no, pide teléfono.
                   const hasCode = target && target.code && target.code !== 'N/A' && target.code !== 'Pendiente';
                   
                   return (
                       <>
                           <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-500">
                               <ShieldAlert size={32}/>
                           </div>
                           <h3 className="text-xl font-bold text-gray-800 mb-2">Verificación de Seguridad</h3>
                           <p className="text-sm text-gray-500 mb-6">
                               {hasCode 
                                ? "Para proteger tu boleto, ingresa tu Código de Estudiante y tu Teléfono." 
                                : "Ingresa tu Número de Teléfono registrado para ver tu boleto."}
                           </p>
                           
                           <form onSubmit={handleVerifyIdentity} className="space-y-4">
                               {hasCode && (
                                   <input 
                                     type="text"
                                     placeholder="Código de Estudiante"
                                     value={authCodeInput}
                                     onChange={(e) => setAuthCodeInput(e.target.value)}
                                     className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-center font-bold text-lg focus:ring-2 focus:ring-orange-500 outline-none" 
                                     autoFocus
                                   />
                               )}
                               <input 
                                 type="tel"
                                 placeholder="Número de Teléfono"
                                 value={authPhoneInput}
                                 onChange={(e) => setAuthPhoneInput(e.target.value)}
                                 className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-center font-bold text-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                 autoFocus={!hasCode} // Autofocus en teléfono si no hay código
                               />
                               <button type="submit" className="w-full py-3 rounded-xl font-bold text-white bg-orange-600 hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/30">
                                 Ver mi Boleto
                               </button>
                           </form>
                       </>
                   );
               })()}
           </div>
        </div>
      )}

      {/* TICKET MODAL */}
      {showTicketModal && ticketData && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[70] flex items-center justify-center p-4 animate-in zoom-in duration-300">
              {(() => {
                  const p = passengers.find(p => p.id === ticketData.id) || ticketData;
                  const busId = p.bus_id || 1;
                  const busInfo = BUSES.find(b => b.id === busId);
                  
                  return (
                    <div className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                        <div className={`bg-gradient-to-br ${busInfo.color} p-6 text-white text-center relative overflow-hidden`}>
                            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                            <Ticket size={48} className="mx-auto mb-2 drop-shadow-lg"/>
                            <h2 className="text-2xl font-black uppercase tracking-widest drop-shadow-md">Boleto FIL 2025</h2>
                            <p className="text-xs font-bold opacity-80 uppercase tracking-wide">Pase de Abordar Oficial</p>
                            <div className="mt-2 inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold border border-white/20 backdrop-blur-md">
                                {busInfo.label}
                            </div>
                            <button onClick={() => setShowTicketModal(false)} className="absolute top-4 right-4 bg-black/20 hover:bg-black/30 p-2 rounded-full transition-colors"><X size={20}/></button>
                        </div>
                        
                        <div className="p-8 flex flex-col items-center gap-6 relative">
                            {/* Perforaciones decorativas */}
                            <div className="absolute -left-3 top-0 bottom-0 my-auto w-6 h-6 bg-black rounded-full"></div>
                            <div className="absolute -right-3 top-0 bottom-0 my-auto w-6 h-6 bg-black rounded-full"></div>

                            <div className="text-center w-full">
                                <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Pasajero</p>
                                <h3 className="text-xl font-bold text-gray-800 leading-tight">{p.name}</h3>
                                <div className="flex justify-center gap-2 mt-2">
                                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-bold">{p.code}</span>
                                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${busInfo.bg} ${busInfo.text}`}>Asiento: {p.seat_number || 'N/A'}</span>
                                </div>
                            </div>

                            <div className="w-full border-t border-dashed border-gray-300"></div>

                            {/* SECCIÓN TUTOR ELIMINADA POR PRIVACIDAD */}
                            
                            <div className="bg-gray-50 p-4 rounded-xl w-full text-center mt-2">
                                <p className="text-[10px] text-gray-400 uppercase font-bold mb-2">Estado</p>
                                <div className="flex items-center justify-center gap-2 text-green-600 font-black text-lg uppercase tracking-wider">
                                    <Check size={24} strokeWidth={3} /> Liberado
                                </div>
                            </div>
                        </div>
                    </div>
                  );
              })()}
          </div>
      )}

      {/* BUS MAP MODAL */}
      {showBusMap && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-orange-200 relative max-h-[95vh] flex flex-col overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Bus className="text-orange-500" /> Mapa del {BUSES.find(b => b.id === currentBus).label}
                    </h3>
                    <button onClick={() => setShowBusMap(false)} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"><X size={20}/></button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-100/50">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* THE BUS */}
                        <div className="flex-1">
                            <div className="bg-white p-6 rounded-[3rem] shadow-xl border-4 border-gray-200 relative mx-auto max-w-sm">
                                {/* Driver Area */}
                                <div className="border-b-4 border-dashed border-gray-200 pb-4 mb-6 flex justify-between px-8 text-gray-300 font-bold uppercase tracking-widest text-xs">
                                    <span>Frente</span>
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-200"><User size={20}/></div>
                                </div>

                                {/* Seats Grid */}
                                <div className="space-y-3">
                                    {/* Rows 1-10 (Standard 4 seats) */}
                                    {Array.from({ length: 10 }).map((_, rowIndex) => (
                                        <div key={rowIndex} className="flex justify-between items-center gap-2 md:gap-4">
                                            <div className="flex gap-2">
                                                {[1, 2].map(offset => {
                                                    const seatNum = (rowIndex * 4) + offset;
                                                    const occupant = currentBusPassengers.find(p => p.seat_number == seatNum);
                                                    return (
                                                        <button 
                                                            key={seatNum}
                                                            onClick={() => handleSeatClick(seatNum)}
                                                            className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-sm transition-all transform hover:scale-110 active:scale-95 border-b-4 ${occupant ? 'bg-red-500 border-red-700 text-white' : 'bg-green-400 border-green-600 text-white hover:bg-green-500'}`}
                                                        >
                                                            {occupant ? <span className="text-[10px] font-bold leading-none overflow-hidden px-0.5">{getFirstName(occupant.name)}</span> : <span className="text-xs font-bold opacity-50">{seatNum}</span>}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-300 w-4 text-center">{rowIndex + 1}</span>
                                            <div className="flex gap-2">
                                                {[3, 4].map(offset => {
                                                    const seatNum = (rowIndex * 4) + offset;
                                                    const occupant = currentBusPassengers.find(p => p.seat_number == seatNum);
                                                    return (
                                                        <button 
                                                            key={seatNum}
                                                            onClick={() => handleSeatClick(seatNum)}
                                                            className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-sm transition-all transform hover:scale-110 active:scale-95 border-b-4 ${occupant ? 'bg-red-500 border-red-700 text-white' : 'bg-green-400 border-green-600 text-white hover:bg-green-500'}`}
                                                        >
                                                            {occupant ? <span className="text-[10px] font-bold leading-none overflow-hidden px-0.5">{getFirstName(occupant.name)}</span> : <span className="text-xs font-bold opacity-50">{seatNum}</span>}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {/* Row 11 (41, 42) & WC */}
                                    <div className="flex justify-between items-center gap-2 md:gap-4 border-t-2 border-dashed border-gray-100 pt-3">
                                        {/* Left: 41, 42 */}
                                        <div className="flex gap-2">
                                            {[41, 42].map(seatNum => {
                                                const occupant = currentBusPassengers.find(p => p.seat_number == seatNum);
                                                return (
                                                    <button 
                                                        key={seatNum}
                                                        onClick={() => handleSeatClick(seatNum)}
                                                        className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-sm transition-all transform hover:scale-110 active:scale-95 border-b-4 ${occupant ? 'bg-red-500 border-red-700 text-white' : 'bg-green-400 border-green-600 text-white hover:bg-green-500'}`}
                                                    >
                                                        {occupant ? <span className="text-[10px] font-bold leading-none overflow-hidden px-0.5">{getFirstName(occupant.name)}</span> : <span className="text-xs font-bold opacity-50">{seatNum}</span>}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        
                                        {/* Aisle & Right Side WC */}
                                        <div className="flex gap-2 items-center justify-end flex-1">
                                            {/* WC Area (Takes space of seats 43-44 effectively or right side) */}
                                            <div className="w-[104px] h-12 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                                                <span className="text-xl font-black">WC</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 12 (Back Left: 43, 44, 45) - Aligned with left and aisle */}
                                    <div className="flex justify-start gap-2 md:gap-4 mt-1">
                                        <div className="flex gap-2">
                                            {[43, 44].map(seatNum => {
                                                const occupant = currentBusPassengers.find(p => p.seat_number == seatNum);
                                                return (
                                                    <button 
                                                        key={seatNum}
                                                        onClick={() => handleSeatClick(seatNum)}
                                                        className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-sm transition-all transform hover:scale-110 active:scale-95 border-b-4 ${occupant ? 'bg-red-500 border-red-700 text-white' : 'bg-green-400 border-green-600 text-white hover:bg-green-500'}`}
                                                    >
                                                        {occupant ? <span className="text-[10px] font-bold leading-none overflow-hidden px-0.5">{getFirstName(occupant.name)}</span> : <span className="text-xs font-bold opacity-50">{seatNum}</span>}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        {/* Seat 45 in aisle spot roughly */}
                                        <div className="ml-[10px]"> 
                                             {[45].map(seatNum => {
                                                const occupant = currentBusPassengers.find(p => p.seat_number == seatNum);
                                                return (
                                                    <button 
                                                        key={seatNum}
                                                        onClick={() => handleSeatClick(seatNum)}
                                                        className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-sm transition-all transform hover:scale-110 active:scale-95 border-b-4 ${occupant ? 'bg-red-500 border-red-700 text-white' : 'bg-green-400 border-green-600 text-white hover:bg-green-500'}`}
                                                    >
                                                        {occupant ? <span className="text-[10px] font-bold leading-none overflow-hidden px-0.5">{getFirstName(occupant.name)}</span> : <span className="text-xs font-bold opacity-50">{seatNum}</span>}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SELECTION PANEL */}
                        <div className="w-full md:w-80 flex-shrink-0">
                            {selectedSeat ? (
                                <div className="bg-white p-6 rounded-3xl shadow-lg border border-orange-100 animate-in slide-in-from-right">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-bold text-lg text-gray-800">Asiento #{selectedSeat}</h4>
                                        <button onClick={() => setSelectedSeat(null)} className="text-gray-400 hover:text-gray-600"><X size={18}/></button>
                                    </div>
                                    
                                    {currentBusPassengers.find(p => p.seat_number == selectedSeat) ? (
                                        <div className="text-center py-6">
                                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 text-red-500"><User size={32}/></div>
                                            <p className="text-sm font-bold text-gray-500 uppercase mb-1">Ocupado por</p>
                                            <p className="text-lg font-bold text-gray-800 mb-4">{currentBusPassengers.find(p => p.seat_number == selectedSeat).name}</p>
                                            
                                            {/* Only show Release button if Coordinator */}
                                            {isCoordinator && (
                                                <button onClick={() => releaseSeat(currentBusPassengers.find(p => p.seat_number == selectedSeat).id)} className="bg-red-50 text-red-600 px-6 py-2 rounded-xl font-bold border border-red-200 hover:bg-red-100 w-full">Liberar Asiento</button>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <p className="text-xs font-bold text-gray-400 uppercase mb-2">Asignar a pasajero sin asiento:</p>
                                            
                                            {/* --- MAP LIST TOGGLE BUTTONS (NEW) --- */}
                                            <div className="flex bg-gray-100 p-1 rounded-xl mb-3">
                                                <button 
                                                    onClick={() => setMapListMode('unassigned')}
                                                    className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${mapListMode === 'unassigned' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                                >
                                                    Sin Asiento ({currentBusPassengers.filter(p => !p.seat_number).length})
                                                </button>
                                                <button 
                                                    onClick={() => setMapListMode('assigned')}
                                                    className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${mapListMode === 'assigned' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                                >
                                                    Con Asiento ({currentBusPassengers.filter(p => p.seat_number).length})
                                                </button>
                                            </div>

                                            {/* SEARCH IN SEAT SELECTION */}
                                            <div className="relative mb-2">
                                                <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
                                                <input 
                                                    type="text" 
                                                    placeholder="Buscar pasajero..." 
                                                    value={seatSearchTerm}
                                                    onChange={(e) => setSeatSearchTerm(e.target.value)}
                                                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-orange-500 outline-none"
                                                />
                                            </div>

                                            <div className="max-h-80 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                                                {/* Empty state based on mode */}
                                                {mapListMode === 'unassigned' && currentBusPassengers.filter(p => !p.seat_number).length === 0 && <p className="text-center text-gray-400 text-xs py-4">Todos tienen asiento 🎉</p>}
                                                {mapListMode === 'assigned' && currentBusPassengers.filter(p => p.seat_number).length === 0 && <p className="text-center text-gray-400 text-xs py-4">Nadie tiene asiento aún</p>}

                                                {currentBusPassengers
                                                    // FILTERING BY SEAT NUMBER & MODE
                                                    .filter(p => {
                                                        const matchesSearch = p.name.toLowerCase().includes(seatSearchTerm.toLowerCase()) || (p.code && p.code.includes(seatSearchTerm));
                                                        // Filter only for passengers WITHOUT seat_number if mode is unassigned
                                                        const matchesMode = mapListMode === 'unassigned' ? !p.seat_number : p.seat_number;
                                                        return matchesSearch && matchesMode;
                                                    })
                                                    .sort((a,b) => {
                                                      // Apply the selected sort mode (LastName or Alpha) to the seat assignment list as well
                                                      if (sortMode === 'lastname') {
                                                          const surnameA = getSurname(a.name);
                                                          const surnameB = getSurname(b.name);
                                                          return surnameA.localeCompare(surnameB);
                                                      }
                                                      return a.name.localeCompare(b.name);
                                                    })
                                                    .map(p => (
                                                    <button 
                                                        key={p.id} 
                                                        onClick={() => assignSeat(p.id, selectedSeat)}
                                                        className="w-full text-left p-3 rounded-xl hover:bg-orange-50 border border-transparent hover:border-orange-100 transition-all group"
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <span className="font-bold text-xs text-gray-700 group-hover:text-orange-700 block">{formatDisplayName(p.name)}</span>
                                                                <span className="text-[10px] text-gray-400">{p.code}</span>
                                                            </div>
                                                            {p.seat_number && (
                                                                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-md">#{p.seat_number}</span>
                                                            )}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="bg-white/50 border border-dashed border-gray-300 p-8 rounded-3xl flex flex-col items-center justify-center text-center h-full text-gray-400">
                                    <Armchair size={48} className="mb-3 opacity-50"/>
                                    <p className="text-sm font-medium">Selecciona un asiento del mapa para ver detalles o asignar un pasajero.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* EDIT MODAL WINDOW */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-orange-200 relative max-h-[90vh] overflow-y-auto">
             <div className="flex justify-between items-center mb-6 border-b pb-4">
               <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                 <User className="text-orange-500" /> Ficha del Pasajero
               </h3>
               <button onClick={() => setShowEditModal(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><X size={20}/></button>
             </div>
             
             <div className="space-y-4">
                {/* General Info Section */}
                <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Información General</label>
                    <div>
                        <label className="text-xs font-bold text-gray-500 ml-1">NOMBRE COMPLETO</label>
                        <input name="name" value={editFormData.name} onChange={handleEditChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-800 focus:ring-2 focus:ring-orange-500 outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-bold text-gray-500 ml-1">TELÉFONO</label>
                            <input name="phone" value={editFormData.phone} onChange={handleEditChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 outline-none" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 ml-1">CÓDIGO UDG</label>
                            <input name="code" value={editFormData.code} onChange={handleEditChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 outline-none" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 ml-1">MONTO PAGADO ($)</label>
                        <input type="number" name="amount" value={editFormData.amount} onChange={handleEditChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 outline-none" />
                    </div>
                </div>

                {/* Confidential Info Section */}
                <div className="bg-red-50/50 p-4 rounded-xl space-y-3 border border-red-100">
                    <label className="text-[10px] font-bold text-red-400 uppercase tracking-wider block mb-1 flex items-center gap-1"><ShieldAlert size={12}/> Información Confidencial</label>
                    <div>
                        <label className="text-xs font-bold text-gray-500 ml-1">NSS (SEGURO SOCIAL)</label>
                        <input name="nss" value={editFormData.nss} onChange={handleEditChange} className="w-full p-3 bg-white border border-red-100 rounded-xl font-medium text-gray-700 focus:ring-2 focus:ring-red-200 outline-none" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 ml-1">NOMBRE DEL TUTOR</label>
                        <input name="parent" value={editFormData.parent} onChange={handleEditChange} className="w-full p-3 bg-white border border-red-100 rounded-xl font-medium text-gray-700 focus:ring-2 focus:ring-red-200 outline-none" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 ml-1">TELÉFONO DEL TUTOR</label>
                        <div className="flex gap-2">
                            <input name="parent_phone" value={editFormData.parent_phone} onChange={handleEditChange} className="w-full p-3 bg-white border border-red-100 rounded-xl font-medium text-gray-700 focus:ring-2 focus:ring-red-200 outline-none" />
                            <a href={`tel:${editFormData.parent_phone}`} className="bg-green-100 text-green-700 p-3 rounded-xl flex items-center justify-center hover:bg-green-200 transition-colors"><Phone size={20}/></a>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 pt-2">
                    <button onClick={() => removePassenger(editFormData.id)} className="px-4 py-3 bg-red-100 text-red-600 rounded-xl font-bold hover:bg-red-200 transition-colors flex items-center justify-center" disabled={!canEdit(editFormData.bus_id)}>
                        <Trash2 size={20}/>
                    </button>
                    <button onClick={handleSaveEdit} className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30 flex items-center justify-center gap-2" disabled={!canEdit(editFormData.bus_id)}>
                        <Save size={20}/> Guardar Cambios
                    </button>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-orange-200">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                 <Lock className="text-orange-500" /> Acceso Coordinador
               </h3>
               <button onClick={() => setShowLoginModal(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><X size={20}/></button>
             </div>
             
             <form onSubmit={handleLogin} className="space-y-4">
                {loginError && <div className="p-3 bg-red-100 text-red-700 rounded-xl text-sm font-bold text-center">{loginError}</div>}
                <div>
                   <label className="text-xs font-bold text-gray-500 ml-1">USUARIO</label>
                   <input type="text" value={loginUser} onChange={(e) => setLoginUser(e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Código o Nombre" />
                </div>
                <div>
                   <label className="text-xs font-bold text-gray-500 ml-1">CONTRASEÑA</label>
                   <input type="password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 outline-none" placeholder="••••••" />
                </div>
                <button type="submit" className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-orange-700 transition-colors">Iniciar Sesión</button>
             </form>
          </div>
        </div>
      )}
      
      {/* HEADER */}
      <div className={`bg-gradient-to-br ${BUSES.find(b => b.id === currentBus).color} text-white p-6 pb-12 shadow-2xl shadow-orange-900/50 rounded-b-[2.5rem] relative z-20 transition-all duration-500 overflow-hidden`}>
        {/* Decorative gloss/shadow for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/5 pointer-events-none"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative">
            <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-orange-100/90 mb-1 drop-shadow-md">Planilla</span>
                <div className="flex flex-col">
                    {/* CAMBIO: UNIÓN ESTUDIANTIL en mayúsculas */}
                    <h1 className="text-2xl md:text-3xl font-black flex items-center gap-2 drop-shadow-xl filter">UNIÓN ESTUDIANTIL</h1>
                    <span className="text-sm font-bold text-orange-100 opacity-90 -mt-1 drop-shadow-md">FIL 2025</span>
                </div>
                
                {/* GREETING OR DEFAULT TEXT */}
                <div className="flex items-center gap-2 text-xs text-orange-50 font-medium mt-2 flex-nowrap"> 
                    {currentUser ? (
                        <div className="bg-yellow-400/90 text-yellow-900 px-3 py-1 rounded-full font-bold flex items-center gap-1 shadow-lg shadow-yellow-900/20 animate-in fade-in slide-in-from-left-2 backdrop-blur-sm border border-yellow-300/50 whitespace-nowrap"> 
                            👋 Hola {currentUser}
                        </div>
                    ) : (
                       <div className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm border border-white/10 whitespace-nowrap"> 
                           <Bus size={12} className="text-yellow-300 drop-shadow-sm"/> {BUSES.find(b => b.id === currentBus).label}
                       </div>
                    )}
                    {isCoordinator && (
                        <div className="bg-green-500/80 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1 text-white shadow-sm border border-green-400/30 whitespace-nowrap"> 
                            <Lock size={10} className="drop-shadow-sm" /> Coord. Activo
                        </div>
                    )}
                </div>
            </div>
            
            {/* CAMBIO: Eliminado el contador de Pax */}
            <div className="flex gap-2">
                <button onClick={isCoordinator ? handleLogout : triggerLogin} className={`p-2 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg transition-all ${isCoordinator ? 'bg-red-500/80 hover:bg-red-600 shadow-red-900/20' : 'bg-white/20 hover:bg-white/30 shadow-black/10'}`}>
                    {isCoordinator ? <LogOut size={20} className="drop-shadow-sm" /> : <Lock size={20} className="drop-shadow-sm" />}
                </button>
            </div>
            </div>

            {/* BUS SELECTOR TABS */}
            <div className="flex justify-between bg-black/20 backdrop-blur-md rounded-2xl p-1 mb-6 border border-white/10 shadow-inner">
                {BUSES.map((bus) => (
                    <button 
                        key={bus.id} 
                        onClick={() => setCurrentBus(bus.id)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${currentBus === bus.id ? 'bg-white text-gray-800 shadow-lg scale-105' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                    >
                        {bus.label}
                    </button>
                ))}
            </div>

            {/* Resumen Asistencia */}
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-3 text-center text-xs">
            {legs.map((leg, idx) => {
                const stats = getStats(idx);
                return (
                <div key={idx} className="bg-black/20 backdrop-blur-md rounded-2xl p-2.5 flex flex-col items-center border border-white/10 shadow-inner group transition-all hover:bg-black/30">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-orange-100/90 mb-0.5 drop-shadow-sm">{leg.sub.replace('→ ', '')}</span>
                    <div className="flex items-baseline justify-center gap-0.5 mb-1">
                        <span className={`text-3xl font-black tracking-tighter leading-none drop-shadow-md ${stats.count === stats.total && stats.total > 0 ? 'text-green-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]' : 'text-white'}`}>
                            {stats.count}
                        </span>
                        <span className="text-xs font-bold text-white/60 drop-shadow-sm">/{stats.total}</span>
                    </div>
                    <div className="w-full bg-black/30 h-1.5 rounded-full overflow-hidden shadow-inner">
                        <div className={`h-full shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-700 ease-out ${stats.count === stats.total ? 'bg-green-400' : 'bg-white'}`} style={{ width: `${stats.percent}%` }}></div>
                    </div>
                </div>
                )
            })}
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-6 relative z-30">
        
        {/* STATS CARDS */}
        <div className={`grid gap-3 mb-6 grid-cols-2 ${isCoordinator ? 'sm:grid-cols-4' : 'sm:grid-cols-2'}`}>
          <div className="bg-white p-3 rounded-2xl shadow-lg border-b-4 border-green-500 flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform">
             <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Pagados</span>
             <span className="text-xl font-black text-gray-800">{totalPaidFull}</span>
          </div>
          <div className="bg-white p-3 rounded-2xl shadow-lg border-b-4 border-yellow-400 flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform">
             <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Anticipos</span>
             <span className="text-xl font-black text-gray-800">{totalAdvance}</span>
          </div>
          
          {/* Muestra la tarjeta de Pendientes si NO es coordinador (ocupando el 3er lugar) */}
          {!isCoordinator && (
            <div className="bg-white p-3 rounded-2xl shadow-lg border-b-4 border-red-500 flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Pendientes</span>
                <span className="text-xl font-black text-gray-800">{currentBusPassengers.length - totalPaidFull - totalAdvance}</span>
            </div>
          )}

          {/* Si es coordinador, se muestran Pendientes y Total MXN, por eso el grid-cols-4 */}
          {isCoordinator && (
            <div className="bg-white p-3 rounded-2xl shadow-lg border-b-4 border-red-500 flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform">
               <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Pendientes</span>
               <span className="text-xl font-black text-gray-800">{currentBusPassengers.length - totalPaidFull - totalAdvance}</span>
            </div>
          )}
          
          {isCoordinator && (
            <div className="bg-white p-3 rounded-2xl shadow-lg border-b-4 border-orange-500 flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform">
               <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Total MXN</span>
               <span className="text-lg font-black text-orange-600 tracking-tight">${totalMoney.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* COORDINADOR */}
        <div className="mb-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700 max-w-2xl mx-auto">
            <div className="p-4 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Crown size={16} className="text-yellow-400 fill-yellow-400 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-400/90">{BUSES.find(b => b.id === currentBus).label}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white leading-tight">{BUSES.find(b => b.id === currentBus).coordinator.name}</h3>
                    <div className="flex flex-row gap-3 mt-1 text-gray-400 text-xs">
                        <span className="flex items-center gap-1.5"><Phone size={12} /> {BUSES.find(b => b.id === currentBus).coordinator.phone}</span>
                    </div>
                </div>
                <a href={`tel:${BUSES.find(b => b.id === currentBus).coordinator.phone}`} className="bg-green-600 hover:bg-green-500 text-white p-3 rounded-full shadow-lg shadow-green-900/50 transition-transform active:scale-95">
                    <Phone size={20} strokeWidth={2.5} />
                </a>
            </div>
        </div>

        {/* SEARCH & ACTIONS */}
        <div className="flex flex-col md:flex-row gap-3 mb-4 max-w-4xl mx-auto">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-3.5 text-orange-300 transition-colors group-focus-within:text-orange-500" size={18} />
            <input type="text" placeholder="Buscar estudiante (nombre o código)..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-white border-none rounded-2xl shadow-md text-sm font-medium focus:ring-4 focus:ring-orange-500/20 transition-all outline-none" />
          </div>

          {/* BOTÓN MAPA (MÁS VISIBLE AHORA) */}
          <button 
            onClick={() => setShowBusMap(true)} 
            className="p-3 bg-white text-orange-600 rounded-2xl shadow-md hover:bg-orange-50 hover:text-orange-700 transition-colors flex items-center justify-center gap-2 border border-orange-100 px-6 group"
          >
            <Armchair size={20} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" /> 
            <span className="font-bold text-sm whitespace-nowrap">Ver Mapa</span>
          </button>

          <button onClick={exportToCSV} className="p-3 bg-white text-green-600 rounded-2xl shadow-md hover:bg-green-50 hover:text-green-700 transition-colors flex items-center justify-center gap-2">
            <Download size={20} strokeWidth={2.5} /> <span className="md:hidden font-bold text-sm">Descargar Excel</span>
          </button>
        </div>

        {/* FILTERS & SORT */}
        <div className="flex items-center gap-3 mb-6 w-full max-w-full overflow-x-auto pb-2 px-1 no-scrollbar justify-start">
           <div className="flex-shrink-0 bg-white p-2 rounded-full shadow-sm"><ListFilter size={16} className="text-orange-500"/></div>
           
           {/* 1. TODOS (RESET) */}
           <button 
             onClick={() => setFilterLeg(null)} 
             className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm ${filterLeg === null ? 'bg-gray-800 text-white scale-105 shadow-md' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
           >
             Todos
           </button>

           {/* 2. ORDEN (ORIGINAL/A-Z) */}
           <button onClick={cycleSortMode} className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm bg-white text-gray-600 hover:bg-gray-50 flex items-center gap-2 border border-gray-100">
              {sortMode === 'original' ? <ArrowUpDown size={14} className="text-gray-400"/> : <ArrowDownAZ size={14} className="text-orange-500"/>}
              {getSortLabel()}
           </button>

           {/* SEPARADORES Y FILTROS SOLO PARA COORDINADOR */}
           {isCoordinator && (
             <>
               <div className="flex-shrink-0 w-px h-6 bg-gray-200 mx-1"></div>

               {/* 3. CARTAS PENDIENTES */}
               <button 
                  onClick={() => setFilterLeg('pending')} 
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shadow-sm ${filterLeg === 'pending' ? 'bg-yellow-500 text-white scale-105 shadow-yellow-500/30' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
               >
                  <FileText size={14} /> Cartas Pendientes
                  <span className="bg-white/20 px-1.5 py-0.5 rounded-md text-[10px]">{countPendingCards}</span>
               </button>

               {/* 4. CARTAS REVISADAS */}
               <button 
                  onClick={() => setFilterLeg('reviewed')} 
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shadow-sm ${filterLeg === 'reviewed' ? 'bg-green-500 text-white scale-105 shadow-green-500/30' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
               >
                  <FileCheck size={14} /> Cartas Revisadas
                  <span className="bg-white/20 px-1.5 py-0.5 rounded-md text-[10px]">{countReviewedCards}</span>
               </button>

               {/* 5. SIN DOCUMENTOS */}
               <button 
                  onClick={() => setFilterLeg('no_docs')} 
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shadow-sm ${filterLeg === 'no_docs' ? 'bg-red-500 text-white scale-105 shadow-red-500/30' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
               >
                  <FileWarning size={14} /> Sin Documentos
                  <span className="bg-white/20 px-1.5 py-0.5 rounded-md text-[10px]">{countNoDocs}</span>
               </button>

               <div className="flex-shrink-0 w-px h-6 bg-gray-200 mx-1"></div>

               {/* 6, 7, 8. ASISTENCIA (Ida, Inter, Regreso) */}
               {legs.map((leg) => (
                 <button key={leg.id} onClick={() => setFilterLeg(leg.id)} className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shadow-sm ${filterLeg === leg.id ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white scale-105 shadow-orange-500/30' : 'bg-white text-gray-500 hover:bg-gray-50'}`}>
                    <span className={filterLeg === leg.id ? 'text-white' : 'text-orange-400'}>{leg.icon}</span> {filterLeg === leg.id ? `Faltan ${leg.short}` : leg.short}
                 </button>
               ))}
             </>
           )}
        </div>

        {/* ADD SAMUEL BUTTON (IF MISSING) */}
        {isCoordinator && !passengers.find(p => p.name === "Samuel Méndez Vidrio") && (
           <div className="flex justify-center mb-4 animate-in fade-in">
               <button 
                  onClick={addCoordinatorIfMissing} 
                  className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-xs font-bold border border-indigo-200 hover:bg-indigo-100 flex items-center gap-2 shadow-sm"
               >
                  <UserPlus size={14}/> No apareces en la lista? Agrégate aquí
               </button>
           </div>
        )}

        {/* FORMULARIO AGREGAR */}
        {showAddForm && isCoordinator && (
          <div className="mb-6 bg-white p-5 rounded-3xl shadow-xl border border-orange-100 animate-in fade-in slide-in-from-top-4 max-w-2xl mx-auto">
            <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide flex items-center gap-2"><span className="w-1 h-4 bg-orange-500 rounded-full"></span> Nuevo Pasajero al {BUSES.find(b=>b.id === currentBus).label}</h3>
            <form onSubmit={addPassenger} className="space-y-3">
              <input type="text" placeholder="Nombre completo" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-medium"/>
              <button type="submit" className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-orange-500/30 active:scale-95 transition-transform">Guardar Estudiante</button>
            </form>
          </div>
        )}

        {/* LISTA DE PASAJEROS (LISTA SIMPLE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20 max-w-7xl mx-auto">
          {filteredPassengers.length === 0 ? (
            <div className="col-span-full text-center py-12 px-6 bg-white/50 rounded-3xl border border-dashed border-gray-300 mt-4">
               {filterLeg !== null && filterLeg !== 'pending' && filterLeg !== 'reviewed' && filterLeg !== 'seated' && filterLeg !== 'no_docs' ? (
                 <>
                   <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner"><Check size={32} className="text-green-600" strokeWidth={3} /></div>
                   <h3 className="text-lg font-bold text-gray-800">¡Zona Completada!</h3>
                 </>
               ) : (
                 <>
                    <Search size={40} className="mx-auto mb-3 text-gray-300" />
                    <p className="text-gray-400 font-medium">
                        {filterLeg === 'pending' ? 'No hay documentos pendientes de revisión' : 
                         filterLeg === 'reviewed' ? 'No hay cartas revisadas aún' : 
                         filterLeg === 'seated' ? 'Nadie ha apartado asiento aún' :
                         filterLeg === 'no_docs' ? '¡Excelente! Todos han subido sus documentos' :
                         'No se encontraron resultados'}
                    </p>
                 </>
               )}
            </div>
          ) : (
            filteredPassengers.map((p) => {
              const busInfo = BUSES.find(b => b.id === (p.bus_id || 1));
              const docCount = p.documents ? p.documents.length : 0;
              const canModify = canEdit(p.bus_id); // Verifica si el coordinador actual puede modificar este pasajero

              return (
              <div key={p.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-orange-50/50 overflow-hidden transition-all duration-300 group relative flex flex-col w-full mx-auto">
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${busInfo.color}`}></div>
                
                <div className="p-3 relative z-10 pl-4 flex-1 flex justify-between items-start">
                  <div className="flex-1 pr-14 min-w-0"> {/* Aumentado el padding derecho para evitar solapamiento con el dinero */}
                        
                        {/* EDICIÓN RÁPIDA DE DINERO (Posicionamiento absoluto) */}
                        <div className="absolute top-3 right-3 z-20">
                            {isCoordinator ? (
                                <div className={`flex items-center gap-1 px-3 py-1 rounded-full border shadow-sm transition-colors ${p.amount >= 480 ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                                    <span className={`text-xs font-extrabold ${p.amount >= 480 ? 'text-green-700' : 'text-yellow-700'}`}>$</span>
                                    <input 
                                        type="number" 
                                        value={p.amount}
                                        onChange={(e) => handleLocalAmountChange(p.id, e.target.value)}
                                        onBlur={(e) => handleAmountBlur(p.id, e.target.value)}
                                        onKeyDown={(e) => { if(e.key === 'Enter') e.target.blur(); }}
                                        className={`w-14 text-xs font-extrabold bg-transparent outline-none text-right ${p.amount >= 480 ? 'text-green-700 placeholder-green-300' : 'text-yellow-700 placeholder-yellow-300'}`}
                                        disabled={!canModify} // Deshabilitar si no es el coordinador de este camión
                                    />
                                </div>
                            ) : (
                                <div className={`text-xs font-extrabold px-3 py-1 rounded-full border shadow-sm ${p.amount >= 480 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                                    ${p.amount}
                                </div>
                            )}
                        </div>

                        {/* NOMBRE CLICKABLE (Abre modal o Login) */}
                        <h3 onClick={() => handleEditClick(p)} className={`font-bold text-sm leading-tight mb-2 transition-colors cursor-pointer hover:text-orange-600 text-gray-800 flex items-center gap-2 group-hover:underline select-none truncate pr-2`}>
                            {formatDisplayName(p.name)} 
                            {isCoordinator ? (
                                canModify ? (
                                    <Edit2 size={12} className="text-gray-300 group-hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"/>
                                ) : (
                                    <Eye size={12} className="text-gray-400 transition-all flex-shrink-0"/>
                                )
                            ) : (
                                <Lock size={12} className="text-gray-300 group-hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"/>
                            )}
                        </h3>
                        
                        <div className="flex flex-wrap gap-2 text-[10px] text-gray-500 mb-2">
                            <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-md border border-orange-100/50"><Phone size={10} className="text-orange-500" /><span className="font-medium">{p.phone}</span></div>
                            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md border border-gray-100/50"><GraduationCap size={12} className="text-gray-400" /><span>{isCoordinator ? p.code : '•••••'}</span></div>
                            
                            {/* NUEVO: Asiento apartado */}
                            {p.seat_number && (
                                <div className="flex items-center gap-1 bg-purple-100 px-2 py-1 rounded-md border border-purple-200 text-purple-700 font-bold">
                                    <Armchair size={10} />
                                    <span>Asiento: #{p.seat_number}</span>
                                </div>
                            )}

                            <div className={`flex items-center gap-1 px-2 py-1 rounded-md border border-gray-100/50 ${busInfo.bg} ${busInfo.text} font-bold`}>
                                <Bus size={10} />
                                <span>C{p.bus_id || 1}</span>
                            </div>
                        </div>

                        {/* --- CARTA / DOCUMENTO AREA --- */}
                        <div className="mt-3 flex flex-col gap-2">
                            {/* Documentos subidos (Visible solo para Coordinador) */}
                            {isCoordinator && docCount > 0 && (
                                <div className="space-y-1">
                                {p.documents.map((doc, index) => (
                                    <div key={index} className="flex items-center gap-2 p-2 rounded-lg text-xs font-medium border border-gray-100 bg-gray-50">
                                        <FileText size={14} className={`text-gray-500 ${doc.name.endsWith('.pdf') ? 'text-red-500' : 'text-blue-500'}`} />
                                        <a href={doc.url} target="_blank" rel="noreferrer" className="truncate text-gray-700 hover:underline flex-1">{doc.name}</a>
                                        {canModify && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setDocumentToDelete({
                                                        passengerId: p.id,
                                                        docUrl: doc.url,
                                                        docName: doc.name,
                                                    });
                                                }}
                                                className="text-red-500 hover:text-red-700 p-0.5 rounded-full hover:bg-white transition-colors"
                                                title="Eliminar este documento"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        )}
                                        {isCoordinator && !canModify && (
                                            <a href={doc.url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-orange-500"><ExternalLink size={12}/></a>
                                        )}
                                    </div>
                                ))}
                                </div>
                            )}

                            {/* Botón de Subir/Gestionar (Pasajero) o Estado (Coordinador) */}
                            {docCount > 0 ? (
                                isCoordinator ? (
                                    // COORDINADOR: Muestra documentos subidos y el botón de subir más
                                    <div className="flex items-center gap-1.5 text-xs font-bold bg-green-50 text-green-600 px-3 py-1.5 rounded-lg border border-green-200">
                                        <FileCheck size={14}/> {docCount} Documento(s) Subido(s)
                                    </div>
                                ) : (
                                    // PASAJERO: Lógica condicional según estado del boleto
                                    p.ticket_released ? (
                                        <div className="flex items-center justify-center gap-1.5 text-xs font-bold bg-green-50 text-green-600 px-3 py-1.5 rounded-lg border border-green-200">
                                            <FileCheck size={14}/> Documentos Revisados
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-1.5 text-xs font-bold bg-yellow-50 text-yellow-600 px-3 py-1.5 rounded-lg border border-yellow-200">
                                            <FileText size={14}/> Documentos En Revisión
                                        </div>
                                    )
                                )
                            ) : (
                                // Sin documentos subidos: Mostrar botón de subir
                                <label className="flex items-center justify-center gap-1.5 text-xs font-bold bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer active:scale-95">
                                    <Upload size={14}/> Subir Documentos
                                    <input type="file" multiple accept="image/*,application/pdf" className="hidden" onChange={(e) => handleUploadLetter(e, p.id)} />
                                </label>
                            )}

                            {/* TICKET RELEASE & TOGGLE (Solo Coordinador) */}
                            <div className="flex gap-2 items-center">
                                {isCoordinator && (
                                    <button 
                                        onClick={() => toggleTicketRelease(p.id, p.ticket_released)}
                                        className={`p-2 rounded-lg border transition-colors flex items-center justify-center flex-1 text-xs font-bold ${
                                            p.ticket_released 
                                            ? 'bg-green-100 border-green-300 text-green-700 hover:bg-green-200' 
                                            : 'bg-red-100 border-red-300 text-red-700 hover:bg-red-200'
                                        }`}
                                        title={p.ticket_released ? "Bloquear Boleto" : "Liberar Boleto"}
                                        disabled={!canModify || (docCount === 0 && !p.ticket_released)} // Deshabilitar si no tiene permiso O si no hay documentos
                                    >
                                        {p.ticket_released ? <Unlock size={14} /> : <Lock size={14}/>} {p.ticket_released ? 'Liberado' : 'Bloqueado'}
                                    </button>
                                )}

                                {/* TICKET BUTTON (Si está liberado) */}
                                {p.ticket_released && (
                                    <>
                                        {isCoordinator ? (
                                            // COORDINADOR VE DIRECTAMENTE
                                            <button onClick={() => openTicketModal(p)} className="flex items-center gap-1.5 text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-lg shadow-md hover:shadow-lg transition-all animate-pulse flex-1">
                                                <Ticket size={14}/> Ver Boleto
                                            </button>
                                        ) : (
                                            // PASAJERO DEBE VERIFICAR TELEFONO (Ahora con el MISMO diseño que coordinador)
                                            <button onClick={() => openAuthModal(p.id)} className="flex items-center gap-1.5 text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-lg shadow-md hover:shadow-lg transition-all animate-pulse flex-1">
                                                <Ticket size={14}/> Ver Boleto
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                  </div>
                </div>

                {/* --- CHECKBOXES ASISTENCIA --- */}
                <div className="grid grid-cols-3 divide-x divide-gray-100 bg-gray-50/30 relative z-10 border-t border-gray-100 mt-auto">
                    {legs.map((leg, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => toggleCheck(p.id, idx)} 
                        className={`relative flex flex-col items-center justify-center py-2 transition-all duration-300 group/btn hover:bg-white ${p.checks && p.checks[idx] ? 'bg-green-500/5 text-green-700' : 'text-gray-400'}`}
                        disabled={!canModify} // Deshabilitar si no puede modificar
                      >
                        <div className={`mb-1 p-1.5 rounded-full transition-all duration-300 shadow-sm ${p.checks && p.checks[idx] ? 'bg-green-500 text-white scale-110 shadow-green-500/40' : 'bg-white text-gray-300 group-hover/btn:text-orange-400 shadow-sm border border-gray-100'}`}>
                           {p.checks && p.checks[idx] ? <Check size={14} strokeWidth={4} /> : leg.icon}
                        </div>
                        {p.checks && p.checks[idx] ? (
                            <div className="flex flex-col items-center animate-in zoom-in">
                                <span className="text-[10px] font-black uppercase tracking-wider text-green-600">Abordó</span>
                                <span className="text-[9px] font-medium opacity-80">{p.times?.[idx]}</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 group-hover/btn:text-orange-500/70 transition-colors">{idx === 0 ? 'IDA' : idx === 1 ? 'INTER' : 'REGR'}</span>
                            </div>
                        )}
                        {p.checks && p.checks[idx] && <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-500 rounded-t-full"></div>}
                      </button>
                    ))}
                </div>
              </div>
            )})
          )}
        </div>
        
        {/* BOTONES FLOTANTES */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
            {/* BOTÓN RESTAURAR LISTA (Visible si LA LISTA DEL CAMIÓN ACTUAL está vacía y es Coord) */}
            {isCoordinator && currentBusPassengers.length === 0 && (
                <button 
                    onClick={handleRestoreList} 
                    disabled={uploading}
                    className="bg-red-600 text-white p-3 rounded-full shadow-2xl shadow-red-900/40 hover:scale-105 active:scale-95 transition-all border-2 border-white flex items-center gap-2 font-bold text-xs"
                >
                    {uploading ? 'Subiendo...' : `⚠️ RESTAURAR LISTA C${currentBus}`}
                </button>
            )}

            <button onClick={isCoordinator ? () => setShowAddForm(true) : triggerLogin} className="bg-gray-900 text-white p-4 rounded-full shadow-2xl shadow-gray-900/40 hover:scale-105 active:scale-95 transition-all border-4 border-white/20">
                {isCoordinator ? <Plus size={24} strokeWidth={3} /> : <Lock size={24} />}
            </button>
        </div>

      </div>
    </div>
  );
};

export default App;
