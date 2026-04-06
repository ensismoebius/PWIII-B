import { useState } from 'react';

export default function Cep() {
  const [valorDoCep, setValorDoCep] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [dados, setDados] = useState(null);

  async function carregarDadosDoCEP() {
    if (valorDoCep.length !== 8) {
      setValorDoCep('CEP inválido');
      return;
    }

    setCarregando(true);

    await fetch(`https://viacep.com.br/ws/${valorDoCep}/json/`)
      .then(resposta => resposta.json())
      .then(dadoEmJson => {
        if (dadoEmJson.erro) {
          setValorDoCep('CEP não existe');
          setCarregando(false);
        } else {
          setDados(dadoEmJson);
          setCarregando(false);
        }
      });
  }

  return (
    <div>
      <p>Digite o CEP</p>
      <input
        value={valorDoCep}
        onChange={e => setValorDoCep(e.target.value)}
        inputMode="numeric"
        maxLength={8}
      />

      {carregando && <p>Carregando...</p>}

      {dados && (
        <div>
          <p>📍 Endereço: {dados.logradouro}</p>
          <p>🏙 Bairro: {dados.bairro}</p>
          <p>🌆 Cidade: {dados.localidade}</p>
          <p>🗺 Estado: {dados.uf}</p>
        </div>
      )}

      <button onClick={carregarDadosDoCEP}>Consultar</button>
    </div>
  );
}
