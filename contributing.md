Setup databases
```sql
  create user arcade_typer password '';
  create database development;
  grant all privileges on database "development" TO arcade_typer;
  create database test;
  grant all privileges on database "test" TO arcade_typer;
```
