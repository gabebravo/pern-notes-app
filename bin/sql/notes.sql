CREATE TABLE notes(
  id serial,
  title character varying(50),
  note character varying(50)
);

INSERT INTO notes(title, note)
VALUES 
('Call John', 'Ask if he is available to meet tomorrow at 2pm'),
('Pickup Laundry', 'Be sure to get the ticket form the dresser'),
('Email Insurance', 'Check for a better 6 month payment price');
