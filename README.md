# Healfy — Rastreador de Alimentação

Aplicativo mobile de monitoramento de alimentação e saúde desenvolvido com **Expo + React Native**.

---

## Instalação e Execução

### Pré-requisitos

- [Node.js 18+](https://nodejs.org/)
- [Expo Go](https://expo.dev/go) instalado no celular ou emulador Android/iOS

### Passo a passo

**1. Clone o repositório e instale as dependências do app:**

```bash
git clone <url-do-repositorio>
cd GS_Healfy
npm install
```

**2. Instale as dependências do servidor backend:**

```bash
cd server
npm install
cd ..
```

**3. Configure o endereço do servidor no app:**

Edite [src/config.ts](src/config.ts) com o IP correto para o seu ambiente:

```typescript
// Emulador Android
export const SERVER_URL = 'http://10.0.2.2:3001';

// Dispositivo físico — descubra seu IP com `ipconfig` (Windows) ou `ifconfig` (Mac/Linux)
export const SERVER_URL = 'http://192.168.X.X:3001';

// Simulador iOS ou navegador web
export const SERVER_URL = 'http://localhost:3001';
```

**4. Inicie o servidor backend** (em um terminal separado):

```bash
cd server
npm start
```

O servidor sobe em `http://localhost:3001` e conecta ao broker MQTT automaticamente.

**5. Inicie o app Expo** (em outro terminal, na raiz do projeto):

```bash
npm start
```

Escaneie o QR code com o Expo Go no celular ou pressione `a` para emulador Android / `i` para iOS.

---

## Credenciais de Teste

```
Email: teste@teste.com
Senha: 123
```

---

## Funcionalidades

### Principais
- Registro de refeições com nome, horário, calorias e descrição
- Resumo diário de calorias e refeições
- Metas diárias configuráveis (calorias, água, refeições)
- Perfil do usuário com logout

### Comunicação em Tempo Real — Socket.IO
- Servidor Node.js com **Socket.IO** para sincronização entre dispositivos
- Ao adicionar uma refeição, o evento é emitido para todos os outros apps conectados
- A tela Home atualiza automaticamente ao receber refeições de outros dispositivos
- Indicador de conexão em tempo real (ponto verde = conectado ao servidor)

### Funcionalidade Nativa — Câmera e Notificações Push
- **Câmera/Galeria**: ao adicionar uma refeição, é possível fotografá-la ou escolher da galeria. A foto aparece no card da refeição
- **Notificações push locais**:
  - Notificação imediata ao salvar uma refeição
  - Lembretes diários agendados (café 08h, almoço 12h30, lanche 15h30, jantar 19h)
- Solicita permissões de câmera, galeria e notificações com mensagem explicativa

### Integração IoT — MQTT + Socket.IO
- Servidor conectado ao broker MQTT público **broker.hivemq.com**
- Tópico: `healfy/gs2025/sensors/health`
- Simula um sensor wearable publicando a cada 5 segundos:
  - Frequência cardíaca (BPM) com animação pulsante
  - Contagem de passos diários
  - Temperatura corporal
  - Hidratação detectada pelo sensor
- Tela **Monitor IoT** com dashboard em tempo real
- Indicador do status MQTT e quantidade de apps conectados

### Segurança
- Credenciais de sessão armazenadas com **expo-secure-store** (Keychain no iOS / Keystore no Android)
- Sem credenciais expostas no código-fonte
- Sem dados sensíveis em AsyncStorage

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Mobile | Expo SDK 54 + React Native 0.81 |
| Linguagem | TypeScript |
| Navegação | React Navigation (Stack + Bottom Tabs) |
| Armazenamento | AsyncStorage (refeições/metas) + SecureStore (sessão) |
| Tempo real | Socket.IO |
| IoT | MQTT via broker.hivemq.com |
| Notificações | expo-notifications |
| Câmera | expo-image-picker |
| Backend | Node.js + Express + Socket.IO + mqtt.js |

---

## Estrutura de Arquivos

```
GS_Healfy/
├── server/                        # Backend Node.js
│   ├── index.js                   # Servidor Express + Socket.IO + MQTT
│   └── package.json
├── src/
│   ├── app/App.tsx
│   ├── components/MealCard.tsx
│   ├── config.ts                  # SERVER_URL
│   ├── contexts/AuthContext.tsx
│   ├── navigation/
│   │   ├── TabNavigation.tsx
│   │   └── HomeStack.tsx
│   ├── screens/
│   │   ├── Home.tsx
│   │   ├── IoTDashboard.tsx
│   │   ├── AdicionarRefeicao.tsx
│   │   ├── MetasDiarias.tsx
│   │   ├── Login.tsx
│   │   └── Perfil.tsx
│   ├── services/
│   │   ├── socketService.ts
│   │   ├── notificationService.ts
│   │   └── storageService.ts
│   ├── styles/StyleSheet.ts
│   └── types/index.ts
├── app.json
└── package.json
```
