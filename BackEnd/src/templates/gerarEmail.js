function gerarEmail({ bairroNome, nivel }) {
    return (
        `<div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
        
        <div style="max-width:600px; margin:auto; background:#fff; padding:30px; text-align:center; border-radius:8px;">
            
            <h2 style="color:#e74c3c;">⚠️ Risco de Inundação</h2>

            <p>Saudações caríssimo cidadão.</p>

            <p>Detectamos um risco na sua zona:</p>

            <p><strong>Bairro:</strong> ${bairroNome}</p>
            <p><strong>Nível do Risco:</strong> ${nivel}</p>

            <p style="color:#FF0000;">
                Por favor, tome cuidado!
                
            </p>

        </div>

    </div>`
    )
}

module.exports = gerarEmail;