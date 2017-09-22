Setup development db
```sql
  create user arcade_typer password '';
  create database development;
  grant all privileges on database "development" TO arcade_typer;
```
Setup test db
```sql
  create user arcade_typer password '';
  create database test;
  grant all privileges on database "test" TO arcade_typer;
```
