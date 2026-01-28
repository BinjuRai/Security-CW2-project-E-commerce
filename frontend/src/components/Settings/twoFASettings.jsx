import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/api";
import {
  Shield,
  Check,
  X,
  AlertCircle,
  Key,
  RefreshCw,
  Loader2,
  ChevronRight,
  Download,
} from "lucide-react";
import TwoFASetup from "../auth/twoFAset";

export default function TwoFASettings() {
  const [twoFAStatus, setTwoFAStatus] = useState({
    twoFactorEnabled: false,
    twoFactorEnabledAt: null,
    backupCodesRemaining: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showSetup, setShowSetup] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);

  useEffect(() => {
    fetch2FAStatus();
  }, []);

  const fetch2FAStatus = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.get("/2fa/status");
      if (response.data && response.data.data) {
        setTwoFAStatus(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load 2FA settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSetupSuccess = () => {
    setShowSetup(false);
    fetch2FAStatus();
  };

  if (loading) {
    return (
      <div className="bg-[#fffcfc] border border-[#f1d1d1]/30 p-12 mt-8 flex justify-center">
        <div className="w-8 h-8 border-2 border-[#f1d1d1] border-t-[#494040] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error && !loading) {
    return (
      <div className="bg-[#fffcfc] border border-[#f1d1d1]/30 p-8 mt-8 text-center">
        <AlertCircle className="w-8 h-8 text-[#494040]/30 mx-auto mb-4" />
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#494040]/60 mb-4">
          {error}
        </p>
        <button
          onClick={fetch2FAStatus}
          className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040] border-b border-[#494040] pb-1"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      {showSetup && (
        <TwoFASetup
          onClose={() => setShowSetup(false)}
          onSuccess={handleSetupSuccess}
        />
      )}

      {showDisableModal && (
        <DisableTwoFAModal
          onClose={() => setShowDisableModal(false)}
          onSuccess={() => {
            setShowDisableModal(false);
            fetch2FAStatus();
          }}
        />
      )}

      {showRegenerateModal && (
        <RegenerateBackupCodesModal
          onClose={() => setShowRegenerateModal(false)}
          onSuccess={() => {
            setShowRegenerateModal(false);
            fetch2FAStatus();
          }}
        />
      )}

      <div className="bg-[#fffcfc] border border-[#f1d1d1]/30 mt-8 overflow-hidden shadow-[0_10px_40px_rgba(73,64,64,0.03)]">
        {/* Header */}
        <div className="p-8 md:p-10 border-b border-[#f1d1d1]/20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#f1d1d1]">
                <span className="w-8 h-[1px] bg-[#f1d1d1]"></span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase">
                  Security Layer
                </span>
              </div>
              <h2 className="text-4xl font-serif italic text-[#494040]">
                Two-Factor{" "}
                <span className="font-sans not-italic font-light">
                  Authentication
                </span>
              </h2>
            </div>
            <Shield className="w-10 h-10 text-[#f1d1d1]/40" strokeWidth={1} />
          </div>
        </div>

        <div className="p-8 md:p-10">
          {twoFAStatus.twoFactorEnabled ? (
            <div className="space-y-8">
              {/* Status Card */}
              <div className="flex items-center justify-between p-6 bg-[#f1d1d1]/5 border border-[#f1d1d1]/30">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#494040] flex items-center justify-center">
                    <Check className="w-5 h-5 text-[#fffcfc]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-[#494040]">
                      Status: Active
                    </p>
                    {twoFAStatus.twoFactorEnabledAt && (
                      <p className="text-[11px] text-[#494040]/50 italic font-serif">
                        Secured since{" "}
                        {new Date(
                          twoFAStatus.twoFactorEnabledAt,
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Backup Codes Section */}
              <div className="space-y-4">
                <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/50 block">
                  Emergency Recovery
                </label>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 border border-[#f1d1d1]/40 gap-4">
                  <div className="flex items-center gap-4">
                    <Key className="w-5 h-5 text-[#f1d1d1]" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-medium text-[#494040]">
                        Recovery Backup Codes
                      </p>
                      <p className="text-[11px] text-[#494040]/50">
                        {twoFAStatus.backupCodesRemaining || 0} unused codes
                        remaining
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowRegenerateModal(true)}
                    className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040] hover:text-[#f1d1d1] transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Regenerate Codes
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6">
                <button
                  onClick={() => setShowDisableModal(true)}
                  className="w-full md:w-auto px-10 py-4 border border-[#494040]/20 text-[#494040]/40 hover:text-red-500 hover:border-red-200 transition-all text-[10px] font-bold tracking-[0.2em] uppercase rounded-full"
                >
                  Disable Security Layer
                </button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-sm font-light leading-relaxed text-[#494040]/70">
                  Enhance your account's integrity by adding an additional
                  verification step. Even with your password, unauthorized
                  access remains nearly impossible.
                </p>
                <ul className="space-y-3">
                  {[
                    "Signature protection for your transactions",
                    "Encryption-based verification via mobile",
                    "Peace of mind for your digital atelier",
                  ].map((text, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-[11px] font-medium text-[#494040]/60"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f1d1d1]"></span>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setShowSetup(true)}
                className="w-full bg-[#494040] text-[#fffcfc] py-5 rounded-full flex items-center justify-center gap-3 group hover:bg-[#362f2f] transition-all duration-500"
              >
                <Shield className="w-4 h-4 text-[#f1d1d1]" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase">
                  Enable Authentication
                </span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ==========================================
// DISABLE 2FA MODAL (Redesigned)
// ==========================================
function DisableTwoFAModal({ onClose, onSuccess }) {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDisable = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axiosInstance.post("/2fa/disable", { password, token });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to disable 2FA");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[#494040]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-[#fffcfc] w-full max-w-md shadow-[0_20px_50px_rgba(73,64,64,0.15)] border border-[#f1d1d1]/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 border-b border-[#f1d1d1]/20 flex justify-between items-center">
          <h3 className="text-xl font-serif italic text-[#494040]">
            Deactivate Security
          </h3>
          <button
            onClick={onClose}
            className="text-[#494040]/40 hover:rotate-90 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleDisable} className="p-8 space-y-6">
          <p className="text-[11px] text-[#494040]/50 uppercase tracking-widest text-center">
            Identity Verification Required
          </p>

          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/40">
              Master Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/40">
              6-Digit Secure Code
            </label>
            <input
              type="text"
              maxLength={6}
              value={token}
              onChange={(e) => setToken(e.target.value.replace(/\D/g, ""))}
              placeholder="000 000"
              className="w-full bg-transparent border-b border-[#f1d1d1] py-3 text-center tracking-[0.5em] focus:outline-none focus:border-[#494040] transition-colors font-medium text-lg"
              required
            />
          </div>

          {error && (
            <p className="text-[10px] text-red-400 font-medium tracking-wide text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#494040] text-[#fffcfc] py-4 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-red-500 transition-all disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm Deactivation"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// REGENERATE BACKUP CODES MODAL (Redesigned)
// ==========================================
function RegenerateBackupCodesModal({ onClose, onSuccess }) {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newCodes, setNewCodes] = useState([]);

  const handleRegenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.post(
        "/2fa/regenerate-backup-codes",
        { password, token },
      );
      setNewCodes(response.data.data.backupCodes);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to regenerate codes");
    } finally {
      setLoading(false);
    }
  };

  const downloadCodes = () => {
    const text = `BAGBELLE\n2FA Backup Codes\nGenerated: ${new Date().toLocaleString()}\n\n${newCodes.join("\n")}\n\nKeep these codes secure.`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "revmodz-backup-codes.txt";
    a.click();
  };

  if (newCodes.length > 0) {
    return (
      <div className="fixed inset-0 bg-[#494040]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in zoom-in-95 duration-300">
        <div className="bg-[#fffcfc] w-full max-w-md border border-[#f1d1d1]/30 p-10 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-serif italic text-[#494040]">
              New Recovery Keys
            </h3>
            <p className="text-[10px] tracking-widest text-[#494040]/40 uppercase">
              Store these in a safe vault
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {newCodes.map((code, i) => (
              <div
                key={i}
                className="bg-white border border-[#f1d1d1]/50 p-3 text-center font-mono text-sm tracking-tighter text-[#494040]"
              >
                {code}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={downloadCodes}
              className="flex items-center justify-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040] py-4 border border-[#494040]/10 hover:bg-[#f1d1d1]/10 transition-all"
            >
              <Download size={14} /> Download PDF
            </button>
            <button
              onClick={onSuccess}
              className="bg-[#494040] text-[#fffcfc] py-4 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase"
            >
              Finalize Update
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-[#494040]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-[#fffcfc] w-full max-w-md border border-[#f1d1d1]/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 border-b border-[#f1d1d1]/20 flex justify-between items-center">
          <h3 className="text-xl font-serif italic text-[#494040]">
            Regenerate Vault Keys
          </h3>
          <button
            onClick={onClose}
            className="text-[#494040]/40 hover:rotate-90 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleRegenerate} className="p-8 space-y-6">
          <div className="p-4 bg-[#f1d1d1]/10 border border-[#f1d1d1]/30 text-center">
            <p className="text-[10px] text-[#494040]/60 leading-relaxed tracking-wide">
              ⚠️ This action will immediately invalidate all previously issued
              backup codes.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/40">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/40">
                Authentication Code
              </label>
              <input
                type="text"
                maxLength={6}
                value={token}
                onChange={(e) => setToken(e.target.value.replace(/\D/g, ""))}
                placeholder="000 000"
                className="w-full bg-transparent border-b border-[#f1d1d1] py-3 text-center tracking-[0.5em] focus:outline-none focus:border-[#494040] font-medium"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-[10px] text-red-400 font-medium text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#494040] text-[#fffcfc] py-4 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#362f2f] transition-all disabled:opacity-50"
          >
            {loading ? "Generating..." : "Issue New Keys"}
          </button>
        </form>
      </div>
    </div>
  );
}
