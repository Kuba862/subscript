#!/bin/sh

echo "Waiting for postgres..."

until pg_isready -h "$PGHOST" -p "$PGPORT" -U "$PGUSER"
do
    echo "Postgres is unavailable - sleeping"
    sleep 1
done

echo "PostgreSQL is ready"