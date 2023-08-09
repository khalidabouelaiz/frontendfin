# Base image
FROM node:16 as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force
RUN rm -rf .angular
RUN npm install --force
RUN npm cache clean --force
RUN npm uninstall -g @angular/cli
RUN npm install -g @angular/cli --force
RUN npm install pm2 -g


# Copy frontend files
COPY . .

# Build frontend
# RUN ng build --base-href

# Stage 2: Production-ready image with Apache
# FROM httpd:2

# Copy built files from the builder stage to Apache's document root
# COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/

# Expose port (if necessary)
EXPOSE 4200

# Start Apache web server
CMD ["npm", "start"]

