"use client";

import { useReducer, useMemo, useCallback } from "react";
import { OfferWizard, type ComputedValues } from "@/components/offer-maker/offer-wizard";
import { OfferPreview } from "@/components/offer-maker/offer-preview";
import {
  offerReducer,
  createInitialState,
  resolvePanel,
} from "@/components/offer-maker/offer-types";
import {
  calculateSystemPower,
  calculateAnnualProduction,
  calculateAnnualSavings,
  calculatePaybackYears,
  calculate25YearSavings,
  calculateVAT,
  calculateBillComparison,
  calculateCO2Savings,
} from "@/lib/offer-calculations";
import { generateOfferHtml, fixImagePaths } from "@/lib/generate-offer-html";

export default function OfferMakerPage() {
  const [state, dispatch] = useReducer(offerReducer, "home", createInitialState);

  const computed: ComputedValues = useMemo(() => {
    const panel = resolvePanel(state.system);

    const systemKwp = calculateSystemPower(
      state.system.panelCount,
      panel.wattage,
    );

    const annualProductionKwh = calculateAnnualProduction(
      systemKwp,
      state.site.city,
      state.site.orientation,
      state.site.tiltDegrees,
    );

    const annualSavingsEur = calculateAnnualSavings(annualProductionKwh, 0.25);

    const totalPriceEur =
      state.pricing.panels +
      state.pricing.inverter +
      state.pricing.battery +
      state.pricing.mounting +
      state.pricing.installation +
      state.pricing.other;

    const vat = calculateVAT(totalPriceEur, state.pricing.vatRate);
    const paybackYears = calculatePaybackYears(vat.total, annualSavingsEur);

    const savings25Year = calculate25YearSavings(
      annualSavingsEur,
      0.03,
      panel.degradation / 100,
    );

    const bill = calculateBillComparison(state.site.currentMonthlyBill, annualSavingsEur);
    const co2 = calculateCO2Savings(annualProductionKwh);

    return {
      systemKwp,
      annualProductionKwh,
      annualSavingsEur,
      paybackYears,
      savings25Year,
      totalPriceEur,
      vatAmount: vat.vat,
      totalWithVat: vat.total,
      co2SavedKg: co2.co2SavedKg,
      treesEquivalent: co2.treesEquivalent,
      newMonthlyBill: bill.newMonthly,
    };
  }, [state]);

  const handleExport = useCallback(async () => {
    try {
      const res = await fetch("/solaron-oferta-dom-template.html");
      const templateHtml = await res.text();
      let html = generateOfferHtml(templateHtml, state, computed);
      html = fixImagePaths(html);

      const printScript = `<script>
window.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('print-mode');
  var deck = document.getElementById('deck');
  if (deck) deck.style.transform = '';
  var nav = document.querySelector('.nav-ui');
  if (nav) nav.style.display = 'none';
  var hint = document.querySelector('.hint');
  if (hint) hint.style.display = 'none';
  setTimeout(function() { window.print(); }, 500);
});
<\/script>`;

      html = html.replace("</body>", printScript + "\n</body>");
      const w = window.open("", "_blank");
      if (!w) return;
      w.document.write(html);
      w.document.close();
    } catch {
      alert("Грешка при зареждане на шаблона. Проверете дали файлът е достъпен.");
    }
  }, [state, computed]);

  return (
    <div className="flex h-[calc(100vh-57px)] overflow-hidden">
      <aside className="w-[420px] shrink-0 overflow-y-auto border-r border-border bg-background">
        <OfferWizard
          state={state}
          dispatch={dispatch}
          computed={computed}
          onExport={handleExport}
        />
      </aside>
      <main className="flex-1 overflow-hidden bg-muted/30 p-6">
        <OfferPreview state={state} computed={computed} />
      </main>
    </div>
  );
}
