import { useRef, useState } from 'react'
import { Upload, CheckCircle2, RotateCcw, FileText, AlertCircle } from 'lucide-react'
import { useData } from '../../context/DataContext'

export default function CSVUploader() {
  const { isCustom, csvMeta, loadCSV, resetToSample } = useData()
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)
  const inputRef = useRef(null)

  const handle = async (file) => {
    if (!file) return
    if (!file.name.toLowerCase().endsWith('.csv')) { setError('Selecione um arquivo .csv'); return }
    setLoading(true)
    setError(null)
    const ok = await loadCSV(file)
    setLoading(false)
    if (!ok) setError('Formato não reconhecido. Exporte o relatório de campanhas do Meta Ads ou Google Ads.')
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handle(e.dataTransfer.files[0])
  }

  if (isCustom) {
    return (
      <div className="flex items-center gap-4 glass rounded-2xl px-5 py-3 mb-6 border border-emerald-500/20">
        <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium">Dados reais importados</p>
          <p className="text-white/40 text-xs truncate">{csvMeta?.filename} · {csvMeta?.rows} campanhas</p>
        </div>
        <button onClick={resetToSample}
          className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs transition-colors flex-shrink-0">
          <RotateCcw size={12} />
          Usar dados de exemplo
        </button>
      </div>
    )
  }

  return (
    <div className="mb-6">
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => !loading && inputRef.current?.click()}
        className={`glass rounded-2xl px-5 py-4 flex items-center gap-4 cursor-pointer border transition-all ${
          dragging ? 'border-brand-400/50 bg-brand-500/10' : 'border-transparent hover:border-white/10'
        }`}
      >
        <div className={`w-10 h-10 brand-gradient rounded-xl flex items-center justify-center flex-shrink-0 transition-opacity ${loading ? 'opacity-50' : ''}`}>
          <Upload size={16} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium">
            {loading ? 'Processando CSV...' : 'Importar dados reais (CSV)'}
          </p>
          <p className="text-white/30 text-xs mt-0.5">
            Exporte o relatório de campanhas do Meta Ads ou Google Ads e arraste aqui
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-white/25 text-xs flex-shrink-0">
          <FileText size={12} />
          .csv
        </div>
        <input ref={inputRef} type="file" accept=".csv" className="hidden"
          onChange={e => handle(e.target.files?.[0])} />
      </div>
      {error && (
        <div className="flex items-center gap-2 mt-2 px-2">
          <AlertCircle size={12} className="text-red-400 flex-shrink-0" />
          <p className="text-red-400 text-xs">{error}</p>
        </div>
      )}
    </div>
  )
}
