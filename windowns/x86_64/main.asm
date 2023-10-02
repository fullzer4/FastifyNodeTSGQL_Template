format PE console
entry start

section '.data' data readable writeable

; Porta do servidor HTTP
port dd 3000

; Memória para a resposta HTTP
response db '{"message": "pong"}', 10, 0

section '.text' code readable executable

start:

; Inicializa a pilha
push ebp
mov ebp, esp

; Abre um socket TCP
mov eax, 310
mov ebx, 1
int 0x80

; Armazena o descritor do socket
mov [port], eax

; Loop principal
.loop:

; Aceita uma nova conexão
mov eax, 311
mov ebx, [port]
int 0x80

; Verifica se a conexão foi aceita com sucesso
cmp eax, 0
jle .end

; Obtém o endereço de destino da conexão
mov edx, [eax + 20]
mov ecx, [eax + 24]

; Envia a resposta HTTP
mov eax, 312
mov ebx, edx
mov ecx, response
mov edx, 13
int 0x80

; Fecha a conexão
mov eax, 313
mov ebx, [eax]
int 0x80

; Volta ao loop principal
jmp .loop

.end:

; Limpa a pilha
mov esp, ebp
pop ebp

; Retorna
ret
