#!/bin/bash

export PGPASSWORD='password'

database="notesdb"

echo "Configuring database: $database"

dropdb -U node_user notesdb
createdb -U node_user notesdb

psql -U node_user notesdb < ./bin/sql/notes.sql

echo "$database configured"