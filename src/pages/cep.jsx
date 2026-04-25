import { useState } from 'react';

export default function Cep() {
  const [valorDoCep, setValorDoCep] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState('');

  async function carregarDadosDoCEP() {
    if (valorDoCep.length !== 8) {
      setErro('CEP inválido');
      setDados(null);
      return;
    }

    setCarregando(true);
    setErro('');

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${valorDoCep}/json/`);
      const dadoEmJson = await resposta.json();
      
      if (dadoEmJson.erro) {
        setErro('CEP não existe');
        setDados(null);
      } else {
        setDados(dadoEmJson);
        setErro('');
      }
    } catch (err) {
      setErro('Erro ao buscar CEP');
      setDados(null);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="exuberant-div">
      <p className="exuberant-text">Digite o CEP</p>
      <input
        className="exuberant-input"
        value={valorDoCep}
        onChange={e => setValorDoCep(e.target.value)}
        inputMode="numeric"
        maxLength={8}
        placeholder="00000000"
      />

      {carregando && <p className="loading-message">Carregando...</p>}
      
      {erro && <p className="error-message cb-status-error">{erro}</p>}

      {dados && (
        <div className="exuberant-result">
          <p className="cb-indicator">📍 Endereço: {dados.logradouro}</p>
          <p className="cb-indicator">🏙 Bairro: {dados.bairro}</p>
          <p className="cb-indicator">🌆 Cidade: {dados.localidade}</p>
          <p className="cb-indicator">🗺 Estado: {dados.uf}</p>
        </div>
      )}

      <button className="exuberant-button" onClick={carregarDadosDoCEP}>Consultar</button>
    </div>
  );
}