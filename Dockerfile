FROM postgres

# Define as variáveis de ambiente para o usuário e senha do PostgreSQL
ARG POSTGRES_USER
ENV POSTGRES_USER=$POSTGRES_USER

ARG POSTGRES_PASSWORD
ENV POSTGRES_PASSWORD=$POSTGRES_PASSWORD

# Expõe a porta do PostgreSQL para que ela possa ser acessada externamente
EXPOSE 5432

# Monta o volume de dados do PostgreSQL para que os dados sejam persistidos
VOLUME /var/lib/postgresql/data