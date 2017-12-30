FROM node
MAINTAINER Jérémy Vancoillie "jeremy.vancoillie@gmail.com"

# Define working directory.
WORKDIR /data

EXPOSE 80

# Define default command.
CMD ["bash"]