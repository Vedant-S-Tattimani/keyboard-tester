import React from 'react';
import { getRequiredTestableKeys } from '../Keyboard/keyboardUtils';
import { formatKeyCode } from '../../utils/reportUtils';
import { useLanguage } from '../../contexts/LanguageContext';

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const ComparisonTable = ({ kA, kB }) => {
  const { t } = useLanguage();
  if (!kA || !kB) return null;

  const isSameLayout = kA.layout === kB.layout;
  const isSameMode = kA.mode === kB.mode;
  const isDirectComparison = isSameLayout && isSameMode;

  const durationDiff = Math.abs(kA.duration - kB.duration);
  const fasterK = kA.duration < kB.duration ? t('compare.tabA') : (kB.duration < kA.duration ? t('compare.tabB') : 'Equal');
  
  const coverageDiff = Math.abs(kA.testedKeys - kB.testedKeys);
  const higherCoverageK = kA.testedKeys > kB.testedKeys ? t('compare.tabA') : (kB.testedKeys > kA.testedKeys ? t('compare.tabB') : 'Equal');

  let missingA = [];
  let missingB = [];

  if (isDirectComparison) {
     const required = getRequiredTestableKeys(kA.layout, kA.mode);
     const setA = new Set(kA.rawTestedKeys || []);
     const setB = new Set(kB.rawTestedKeys || []);
     
     required.forEach(code => {
        if (!setA.has(code)) missingA.push(code);
        if (!setB.has(code)) missingB.push(code);
     });
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto animate-in fade-in">
      
      {/* Validity Badge */}
      <div className="flex flex-col items-center mb-2">
         {isDirectComparison ? (
            <div className="px-4 py-1.5 bg-green-500/20 text-green-500 border border-green-500/50 rounded-full text-xs font-bold uppercase tracking-widest text-center">
               {t('compare.directComparison')}
            </div>
         ) : (
            <div className="px-4 py-1.5 bg-amber-500/20 text-amber-500 border border-amber-500/50 rounded-full text-xs font-bold uppercase tracking-widest text-center flex flex-col gap-1">
               <span>{t('compare.limitedComparison')}</span>
               <span className="text-[10px] font-normal text-muted-foreground">{t('compare.limitedComparisonDesc')}</span>
            </div>
         )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full border border-border rounded-lg shadow-sm">
        <table className="w-full text-start border-collapse text-sm">
          <thead>
            <tr className="bg-muted/30 border-b border-border">
              <th className="p-4 font-bold text-xs uppercase tracking-wider text-muted-foreground w-1/3">{t('compare.metric')}</th>
              <th className="p-4 font-bold text-xs uppercase tracking-wider text-card-foreground w-1/3">{t('compare.tabA')}</th>
              <th className="p-4 font-bold text-xs uppercase tracking-wider text-card-foreground w-1/3">{t('compare.tabB')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr className="hover:bg-muted/10">
              <td className="p-4 font-medium">{t('compare.statusLabel')}</td>
              <td className="p-4 font-mono">{kA.status}</td>
              <td className="p-4 font-mono">{kB.status}</td>
            </tr>
            <tr className="hover:bg-muted/10">
              <td className="p-4 font-medium">{t('controls.layout')}</td>
              <td className="p-4 font-mono">{kA.layout}</td>
              <td className="p-4 font-mono">{kB.layout}</td>
            </tr>
            <tr className="hover:bg-muted/10">
              <td className="p-4 font-medium">{t('controls.mode')}</td>
              <td className="p-4 font-mono">{kA.mode}</td>
              <td className="p-4 font-mono">{kB.mode}</td>
            </tr>
            <tr className="hover:bg-muted/10">
              <td className="p-4 font-medium">{t('compare.coverageLabel')}</td>
              <td className="p-4 font-mono">{kA.testedKeys}</td>
              <td className="p-4 font-mono">{kB.testedKeys}</td>
            </tr>
            <tr className="hover:bg-muted/10">
              <td className="p-4 font-medium">Total</td>
              <td className="p-4 font-mono">{kA.totalKeys}</td>
              <td className="p-4 font-mono">{kB.totalKeys}</td>
            </tr>
            <tr className="hover:bg-muted/10">
              <td className="p-4 font-medium">{t('summary.completion')}</td>
              <td className="p-4 font-mono">{kA.completionPercentage}%</td>
              <td className="p-4 font-mono">{kB.completionPercentage}%</td>
            </tr>
            <tr className="hover:bg-muted/10 bg-primary/5">
              <td className="p-4 font-medium">{t('compare.durationLabel')}</td>
              <td className="p-4 font-mono">{formatTime(kA.duration)}</td>
              <td className="p-4 font-mono">{formatTime(kB.duration)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Differences Summary */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
         <h3 className="text-sm font-bold uppercase tracking-widest text-card-foreground">{t('compare.differenceSummary')}</h3>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
               {isDirectComparison ? (
                  <div className="bg-muted/20 p-4 rounded-lg border border-border/50">
                     <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t('compare.coverageDifference')}</h4>
                     {coverageDiff === 0 ? (
                        <p className="text-sm">{t('compare.bothSameKeys')}</p>
                     ) : (
                        <p className="text-sm">
                           <strong className="text-primary">
                             {t('compare.diffKeys', {
                               count: coverageDiff,
                               unit: coverageDiff === 1 ? t('compare.keyUnitSingular') : t('compare.keyUnitPlural'),
                               name: higherCoverageK
                             })}
                           </strong>
                        </p>
                     )}
                  </div>
               ) : (
                  <div className="bg-muted/20 p-4 rounded-lg border border-border/50">
                     <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t('compare.coverageDifference')}</h4>
                     <p className="text-sm text-amber-500 font-medium">{t('compare.limitedComparisonDesc')}</p>
                  </div>
               )}

               <div className="bg-muted/20 p-4 rounded-lg border border-border/50">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t('compare.durationDifference')}</h4>
                  {durationDiff === 0 ? (
                     <p className="text-sm">{t('compare.bothSameTime')}</p>
                  ) : (
                     <p className="text-sm font-mono">
                        {t('compare.diffTime', { seconds: durationDiff, name: fasterK })}
                     </p>
                  )}
               </div>
            </div>

            <div className="space-y-4">
               {isDirectComparison && (
                 <>
                   <div className="bg-muted/20 p-4 rounded-lg border border-border/50">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t('compare.missingKeysA')}</h4>
                      {missingA.length === 0 ? (
                         <span className="text-sm text-green-500 font-bold">{t('compare.none')}</span>
                      ) : (
                         <div className="flex flex-wrap gap-2">
                            {missingA.map(code => (
                               <span key={code} className="px-2 py-1 bg-background border border-border rounded text-[10px] font-mono shadow-sm">
                                  {formatKeyCode(code)}
                               </span>
                            ))}
                         </div>
                      )}
                   </div>
                   
                   <div className="bg-muted/20 p-4 rounded-lg border border-border/50">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t('compare.missingKeysB')}</h4>
                      {missingB.length === 0 ? (
                         <span className="text-sm text-green-500 font-bold">{t('compare.none')}</span>
                      ) : (
                         <div className="flex flex-wrap gap-2">
                            {missingB.map(code => (
                               <span key={code} className="px-2 py-1 bg-background border border-border rounded text-[10px] font-mono shadow-sm">
                                  {formatKeyCode(code)}
                               </span>
                            ))}
                         </div>
                      )}
                   </div>
                 </>
               )}
            </div>
         </div>
         
         <div className="mt-4 p-4 border-l-2 border-primary bg-primary/5 text-xs text-muted-foreground leading-relaxed">
            <strong className="text-card-foreground">{t('compare.whatTells')}</strong> {t('compare.whatTellsDesc')} <br/>
            <strong className="text-card-foreground">{t('compare.whatNotTells')}</strong> {t('compare.whatNotTellsDesc')}
         </div>

      </div>
    </div>
  );
};

export default ComparisonTable;
