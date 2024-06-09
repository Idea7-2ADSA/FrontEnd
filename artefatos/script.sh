#!bin/bash

#atualizando ubuntu
sudo apt update

#criando novo usuario
yes | sudo adduser cliente_idea
echo "cliente_idea:cliente_password" | chpasswd

# Verificar se o Docker está instalado
if ! command -v docker &>/dev/null; then
    echo "Instalando Docker..."
    sudo apt install -y docker.io
    sudo systemctl start docker
    sudo systemctl enable docker
else
    echo "Docker já está instalado."
fi

# Iniciar container com imagens mysql e java
echo "Iniciando compose com imagens..."
wget link do git
sudo docker run -d --name java-container openjdk:17
sudo docker compose up -d

echo "Script de instalação concluído."