FROM node:22

WORKDIR /usr/src/app

# Copy backend dependencies
COPY backend/package.json backend/package-lock.json ./
RUN npm ci

COPY backend .

# Copy frontend dependencies
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend .

EXPOSE 8000 3000

CMD ["npm", "start"]
