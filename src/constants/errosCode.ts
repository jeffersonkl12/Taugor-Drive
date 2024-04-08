export const firebaseErrors: Record<string, string> = {
  'auth/admin-restricted-operation': 'Operação restrita apenas para administradores',
  'auth/argument-error': 'Erro de argumento',
  'auth/app-not-authorized': 'Aplicativo não autorizado',
  'auth/app-not-installed': 'Aplicativo não instalado',
  'auth/captcha-check-failed': 'Verificação de captcha falhou',
  'auth/code-expired': 'Código expirado',
  'auth/cordova-not-ready': 'Cordova não está pronto',
  'auth/cors-unsupported': 'CORS não suportado',
  'auth/credential-already-in-use': 'Credencial já está em uso',
  'auth/custom-token-mismatch': 'Incompatibilidade de token personalizado',
  'auth/requires-recent-login': 'Requer login recente',
  'auth/dependent-sdk-initialized-before-auth': 'SDK dependente inicializado antes da autenticação',
  'auth/dynamic-link-not-activated': 'Link dinâmico não ativado',
  'auth/email-change-needs-verification': 'Alteração de e-mail precisa de verificação',
  'auth/email-already-in-use': 'E-mail já está em uso',
  'auth/emulator-config-failed': 'Falha na configuração do emulador',
  'auth/expired-action-code': 'Código de ação expirado',
  'auth/cancelled-popup-request': 'Solicitação de popup cancelada',
  'auth/internal-error': 'Erro interno',
  'auth/invalid-api-key': 'Chave de API inválida',
  'auth/invalid-app-credential': 'Credencial de aplicativo inválida',
  'auth/invalid-app-id': 'ID de aplicativo inválido',
  'auth/invalid-user-token': 'Token de usuário inválido',
  'auth/invalid-auth-event': 'Evento de autenticação inválido',
  'auth/invalid-cert-hash': 'Hash de certificado inválido',
  'auth/invalid-verification-code': 'Código de verificação inválido',
  'auth/invalid-continue-uri': 'URI de continuação inválido',
  'auth/invalid-cordova-configuration': 'Configuração de Cordova inválida',
  'auth/invalid-custom-token': 'Token personalizado inválido',
  'auth/invalid-dynamic-link-domain': 'Domínio de link dinâmico inválido',
  'auth/invalid-email': 'E-mail inválido',
  'auth/invalid-emulator-scheme': 'Esquema de emulador inválido',
  'auth/invalid-credential': 'Credencial inválida',
  'auth/invalid-message-payload': 'Carga de mensagem inválida',
  'auth/invalid-multi-factor-session': 'Sessão de vários fatores inválida',
  'auth/invalid-oauth-client-id': 'ID do cliente OAuth inválido',
  'auth/invalid-oauth-provider': 'Provedor de OAuth inválido',
  'auth/invalid-action-code': 'Código de ação inválido',
  'auth/unauthorized-domain': 'Domínio não autorizado',
  'auth/wrong-password': 'Senha incorreta',
  'auth/invalid-persistence-type': 'Tipo de persistência inválido',
  'auth/invalid-phone-number': 'Número de telefone inválido',
  'auth/invalid-provider-id': 'ID do provedor inválido',
  'auth/invalid-recipient-email': 'E-mail do destinatário inválido',
  'auth/invalid-sender': 'Remetente inválido',
  'auth/invalid-verification-id': 'ID de verificação inválido',
  'auth/invalid-tenant-id': 'ID do locatário inválido',
  'auth/multi-factor-info-not-found': 'Informações de vários fatores não encontradas',
  'auth/multi-factor-auth-required': 'Autenticação de vários fatores necessária',
  'auth/missing-android-pkg-name': 'Nome do pacote Android ausente',
  'auth/missing-app-credential': 'Credencial de aplicativo ausente',
  'auth/auth-domain-config-required': 'Configuração de domínio de autenticação necessária',
  'auth/missing-verification-code': 'Código de verificação ausente',
  'auth/missing-continue-uri': 'URI de continuação ausente',
  'auth/missing-iframe-start': 'Início do iframe ausente',
  'auth/missing-ios-bundle-id': 'ID de pacote iOS ausente',
  'auth/missing-or-invalid-nonce': 'Nonce ausente ou inválido',
  'auth/missing-multi-factor-info': 'Informações de vários fatores ausentes',
  'auth/missing-multi-factor-session': 'Sessão de vários fatores ausente',
  'auth/missing-phone-number': 'Número de telefone ausente',
  'auth/missing-verification-id': 'ID de verificação ausente',
  'auth/app-deleted': 'Aplicativo excluído',
  'auth/account-exists-with-different-credential': 'Conta existe com credencial diferente',
  'auth/network-request-failed': 'Falha na solicitação de rede',
  'auth/null-user': 'Usuário nulo',
  'auth/no-auth-event': 'Nenhum evento de autenticação',
  'auth/no-such-provider': 'Provedor não encontrado',
  'auth/operation-not-allowed': 'Operação não permitida',
  'auth/operation-not-supported-in-this-environment': 'Operação não suportada neste ambiente',
  'auth/popup-blocked': 'Popup bloqueado',
  'auth/popup-closed-by-user': 'Popup fechado pelo usuário',
  'auth/provider-already-linked': 'Provedor já vinculado',
  'auth/quota-exceeded': 'Cota excedida',
  'auth/redirect-cancelled-by-user': 'Redirecionamento cancelado pelo usuário',
  'auth/redirect-operation-pending': 'Operação de redirecionamento pendente',
  'auth/rejected-credential': 'Credencial rejeitada',
  'auth/second-factor-already-in-use': 'Segundo fator já em uso',
  'auth/maximum-second-factor-count-exceeded': 'Limite máximo de fatores de segundo excedido',
  'auth/tenant-id-mismatch': 'Incompatibilidade de ID do locatário',
  'auth/timeout': 'Tempo esgotado',
  'auth/user-token-expired': 'Token de usuário expirado',
  'auth/too-many-requests': 'Muitas solicitações, tente novamente mais tarde',
  'auth/unauthorized-continue-uri': 'URI de continuação não autorizado',
  'auth/unsupported-first-factor': 'Primeiro fator não suportado',
  'auth/unsupported-persistence-type': 'Tipo de persistência não suportado',
  'auth/unsupported-tenant-operation': 'Operação de locatário não suportada',
  'auth/unverified-email': 'E-mail não verificado',
  'auth/user-cancelled': 'Usuário cancelou',
  'auth/user-not-found': 'Usuário não encontrado',
  'auth/user-disabled': 'Usuário desativado',
  'auth/user-mismatch': 'Usuário incompatível',
  'auth/user-signed-out': 'Usuário desconectado',
  'auth/weak-password': 'Senha fraca',
  'auth/web-storage-unsupported': 'Armazenamento da web não suportado',
  'auth/already-initialized': 'Já inicializado',
  'auth/recaptcha-not-enabled': 'reCAPTCHA não habilitado',
  'auth/missing-recaptcha-token': 'Token reCAPTCHA ausente',
  'auth/invalid-recaptcha-token': 'Token reCAPTCHA inválido',
  'auth/invalid-recaptcha-action': 'Ação reCAPTCHA inválida',
  'auth/missing-client-type': 'Tipo de cliente ausente',
  'auth/missing-recaptcha-version': 'Versão reCAPTCHA ausente',
  'auth/invalid-recaptcha-version': 'Versão reCAPTCHA inválida',
  'auth/invalid-req-type': 'Tipo de requisição inválido',
  'storage/unknown': 'Ocorreu um erro desconhecido.',
  'storage/object-not-found': 'Nenhum objeto existe na referência desejada.',
  'storage/bucket-not-found': 'Nenhum bucket está configurado para o Cloud Storage',
  'storage/project-not-found': 'Nenhum projeto está configurado para o Cloud Storage',
  'storage/quota-exceeded': 'A cota do seu bucket do Cloud Storage foi excedida. Se você estiver no nível gratuito, atualize para um plano pago. Se você estiver em um plano pago, entre em contato com o suporte do Firebase.',
  'storage/unauthenticated': 'O usuário não está autenticado. Autentique-se e tente novamente.',
  'storage/unauthorized': 'O usuário não está autorizado a realizar a ação desejada, verifique suas regras de segurança para garantir que estão corretas.',
  'storage/retry-limit-exceeded': 'O limite máximo de tempo para uma operação (upload, download, exclusão, etc.) foi excedido. Tente fazer upload novamente.',
  'storage/invalid-checksum': 'O arquivo no cliente não corresponde à soma de verificação do arquivo recebido pelo servidor. Tente fazer upload novamente.',
  'storage/canceled': 'O usuário cancelou a operação.',
  'storage/invalid-event-name': 'Nome de evento inválido fornecido. Deve ser um de [ `running` , `progress` , `pause` ]',
  'storage/invalid-url': 'URL inválido fornecido para refFromURL() . Deve estar no formato: gs://bucket/object ou https://firebasestorage.googleapis.com/v0/b/bucket/o/object?token=<TOKEN>',
  'storage/invalid-argument': 'O argumento passado para put() deve ser `File`, `Blob` ou `UInt8` Array. O argumento passado para putString() deve ser uma string bruta, `Base64` ou `Base64URL`.',
  'storage/no-default-bucket': 'Nenhum bucket foi definido na propriedade storageBucket da sua configuração.',
  'storage/cannot-slice-blob': 'Geralmente ocorre quando o arquivo local foi alterado (excluído, salvo novamente, etc.). Tente fazer upload novamente depois de verificar se o arquivo não foi alterado.',
  'storage/server-file-wrong-size': 'O arquivo no cliente não corresponde ao tamanho do arquivo recebido pelo servidor. Tente fazer upload novamente.'
};
