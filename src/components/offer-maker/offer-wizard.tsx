"use client";

import { useState } from "react";
import type { OfferState, OfferAction, OfferType } from "./offer-types";
import { DEFAULT_LINE_ITEMS, UNIT_OPTIONS } from "./offer-types";
import {
  panels,
  inverters,
  batteries,
  mountingTypes,
  evChargerTiers,
} from "@/data/products";
import { Sun, Building2, Tractor, Plus, X } from "lucide-react";

export interface ComputedValues {
  systemKwp: number;
  annualProductionKwh: number;
  annualSavingsEur: number;
  paybackYears: number;
  savings25Year: number;
  totalPriceEur: number;
  vatAmount: number;
  totalWithVat: number;
  co2SavedKg: number;
  treesEquivalent: number;
  newMonthlyBill: number;
}

interface OfferWizardProps {
  state: OfferState;
  dispatch: React.Dispatch<OfferAction>;
  computed: ComputedValues;
  onExport: () => void;
}

const STEPS = [
  { num: 1, label: "Тип и клиент" },
  { num: 2, label: "Система" },
  { num: 3, label: "Ценообразуване" },
  { num: 4, label: "Слайдове" },
];

const OFFER_TYPES: { value: OfferType; label: string; icon: typeof Sun }[] = [
  { value: "home", label: "Дом", icon: Sun },
  { value: "business", label: "Бизнес", icon: Building2 },
  { value: "agriculture", label: "Агро", icon: Tractor },
];

const inputClass =
  "w-full rounded-lg border border-border bg-white px-3 py-2 font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent";
const selectClass =
  "w-full rounded-lg border border-border bg-white px-3 py-2 font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent appearance-none";
const numberClass =
  "w-28 rounded-lg border border-border bg-white px-3 py-2 font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent";
const labelClass = "block font-body text-sm text-foreground-secondary mb-1";

function fmt(n: number, decimals = 0): string {
  return n.toLocaleString("bg-BG", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

const invertersByBrand = inverters.reduce<
  Record<string, typeof inverters>
>((acc, inv) => {
  (acc[inv.brandName] ??= []).push(inv);
  return acc;
}, {});

export function OfferWizard({
  state,
  dispatch,
  computed,
  onExport,
}: OfferWizardProps) {
  const [activeStep, setActiveStep] = useState(1);

  const scrollToStep = (step: number) => {
    setActiveStep(step);
    const el = document.getElementById(`wizard-step-${step}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex h-full flex-col">
      <nav className="sticky top-0 z-10 flex items-center gap-1 border-b border-border bg-background px-4 py-3">
        {STEPS.map((s) => (
          <button
            key={s.num}
            onClick={() => scrollToStep(s.num)}
            className="flex flex-1 flex-col items-center gap-1"
          >
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-display font-semibold transition-colors ${
                activeStep === s.num
                  ? "bg-accent text-white"
                  : "bg-muted text-foreground-secondary"
              }`}
            >
              {s.num}
            </div>
            <span
              className={`text-[10px] font-body leading-tight ${
                activeStep === s.num
                  ? "text-accent font-semibold"
                  : "text-foreground-secondary"
              }`}
            >
              {s.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-10">
        {/* ── Step 1: Тип и клиент ── */}
        <section id="wizard-step-1">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">
            1. Тип и клиент
          </h2>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {OFFER_TYPES.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() =>
                  dispatch({ type: "SET_OFFER_TYPE", payload: value })
                }
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-colors ${
                  state.type === value
                    ? "border-accent bg-accent/5 text-accent"
                    : "border-border bg-white text-foreground-secondary hover:border-accent/40"
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="font-body text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>

          <fieldset className="space-y-3 mb-6">
            <legend className="font-display text-sm font-semibold text-foreground mb-2">
              Клиент
            </legend>
            <div>
              <label className={labelClass}>Име</label>
              <input
                type="text"
                className={inputClass}
                value={state.client.name}
                onChange={(e) =>
                  dispatch({
                    type: "SET_CLIENT",
                    payload: { name: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className={labelClass}>Адрес</label>
              <input
                type="text"
                className={inputClass}
                value={state.client.address}
                onChange={(e) =>
                  dispatch({
                    type: "SET_CLIENT",
                    payload: { address: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Телефон</label>
                <input
                  type="text"
                  className={inputClass}
                  value={state.client.phone}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_CLIENT",
                      payload: { phone: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Имейл</label>
                <input
                  type="email"
                  className={inputClass}
                  value={state.client.email}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_CLIENT",
                      payload: { email: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-3 mb-6">
            <legend className="font-display text-sm font-semibold text-foreground mb-2">
              Консултант
            </legend>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Име</label>
                <input
                  type="text"
                  className={inputClass}
                  value={state.consultant.name}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_CONSULTANT",
                      payload: { name: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Инициали</label>
                <input
                  type="text"
                  className={inputClass}
                  value={state.consultant.initials}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_CONSULTANT",
                      payload: { initials: e.target.value },
                    })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Телефон</label>
                <input
                  type="text"
                  className={inputClass}
                  value={state.consultant.phone}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_CONSULTANT",
                      payload: { phone: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Имейл</label>
                <input
                  type="email"
                  className={inputClass}
                  value={state.consultant.email}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_CONSULTANT",
                      payload: { email: e.target.value },
                    })
                  }
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Подпис (URL на изображение)</label>
              <input
                type="url"
                className={inputClass}
                value={state.consultant.signatureUrl}
                onChange={(e) =>
                  dispatch({
                    type: "SET_CONSULTANT",
                    payload: { signatureUrl: e.target.value },
                  })
                }
                placeholder="https://..."
              />
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="font-display text-sm font-semibold text-foreground mb-2">
              Оферта
            </legend>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelClass}>Номер</label>
                <input
                  type="text"
                  className={inputClass}
                  value={state.offer.number}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_OFFER_META",
                      payload: { number: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Дата</label>
                <input
                  type="date"
                  className={inputClass}
                  value={state.offer.date}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_OFFER_META",
                      payload: { date: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Валидна до</label>
                <input
                  type="date"
                  className={inputClass}
                  value={state.offer.validUntil}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_OFFER_META",
                      payload: { validUntil: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </fieldset>
        </section>

        {/* ── Step 2: Система ── */}
        <section id="wizard-step-2">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">
            2. Система
          </h2>

          <div className="space-y-4">
            <div>
              <label className={labelClass}>Панел</label>
              <select
                className={selectClass}
                value={state.system.panelId}
                onChange={(e) =>
                  dispatch({
                    type: "SET_SYSTEM",
                    payload: { panelId: e.target.value },
                  })
                }
              >
                {panels.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.wattage}W ({p.tech})
                  </option>
                ))}
                <option value="custom">✎ Друг (ръчно)</option>
              </select>
            </div>

            {state.system.panelId === "custom" && (
              <div className="rounded-lg border border-dashed border-accent/40 bg-accent/5 p-3 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={labelClass}>Марка / Модел</label>
                    <input
                      className={inputClass}
                      value={state.system.customPanel.name}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_SYSTEM",
                          payload: { customPanel: { ...state.system.customPanel, name: e.target.value } },
                        })
                      }
                      placeholder="напр. Canadian Solar 550W"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Мощност (W)</label>
                    <input
                      type="number"
                      className={numberClass}
                      value={state.system.customPanel.wattage}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_SYSTEM",
                          payload: { customPanel: { ...state.system.customPanel, wattage: Number(e.target.value) } },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className={labelClass}>КПД (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      className={numberClass}
                      value={state.system.customPanel.efficiency}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_SYSTEM",
                          payload: { customPanel: { ...state.system.customPanel, efficiency: Number(e.target.value) } },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Гаранция прод. (г.)</label>
                    <input
                      type="number"
                      className={numberClass}
                      value={state.system.customPanel.warrantyProduct}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_SYSTEM",
                          payload: { customPanel: { ...state.system.customPanel, warrantyProduct: Number(e.target.value) } },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Гаранция произв. (г.)</label>
                    <input
                      type="number"
                      className={numberClass}
                      value={state.system.customPanel.warrantyPerformance}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_SYSTEM",
                          payload: { customPanel: { ...state.system.customPanel, warrantyPerformance: Number(e.target.value) } },
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Деградация (%/год.)</label>
                  <input
                    type="number"
                    step="0.1"
                    className={numberClass}
                    value={state.system.customPanel.degradation}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_SYSTEM",
                        payload: { customPanel: { ...state.system.customPanel, degradation: Number(e.target.value) } },
                      })
                    }
                  />
                </div>
              </div>
            )}

            <div>
              <label className={labelClass}>Инвертор</label>
              <select
                className={selectClass}
                value={state.system.inverterId}
                onChange={(e) =>
                  dispatch({
                    type: "SET_SYSTEM",
                    payload: { inverterId: e.target.value },
                  })
                }
              >
                {Object.entries(invertersByBrand).map(([brand, models]) => (
                  <optgroup key={brand} label={brand}>
                    {models.map((inv) => (
                      <option key={inv.id} value={inv.id}>
                        {inv.model} — {inv.powerKw} kW ({inv.phases}Ф,{" "}
                        {inv.type})
                      </option>
                    ))}
                  </optgroup>
                ))}
                <option value="custom">✎ Друг (ръчно)</option>
              </select>
            </div>

            {state.system.inverterId === "custom" && (
              <div className="rounded-lg border border-dashed border-accent/40 bg-accent/5 p-3 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={labelClass}>Марка</label>
                    <input
                      className={inputClass}
                      value={state.system.customInverter.brand}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_SYSTEM",
                          payload: { customInverter: { ...state.system.customInverter, brand: e.target.value } },
                        })
                      }
                      placeholder="напр. Huawei"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Модел</label>
                    <input
                      className={inputClass}
                      value={state.system.customInverter.model}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_SYSTEM",
                          payload: { customInverter: { ...state.system.customInverter, model: e.target.value } },
                        })
                      }
                      placeholder="напр. SUN2000-5KTL"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className={labelClass}>Мощност (kW)</label>
                    <input
                      type="number"
                      step="0.1"
                      className={numberClass}
                      value={state.system.customInverter.powerKw}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_SYSTEM",
                          payload: { customInverter: { ...state.system.customInverter, powerKw: Number(e.target.value) } },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>КПД (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      className={numberClass}
                      value={state.system.customInverter.efficiency}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_SYSTEM",
                          payload: { customInverter: { ...state.system.customInverter, efficiency: Number(e.target.value) } },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Фази</label>
                    <select
                      className={selectClass}
                      value={state.system.customInverter.phases}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_SYSTEM",
                          payload: { customInverter: { ...state.system.customInverter, phases: Number(e.target.value) as 1 | 3 } },
                        })
                      }
                    >
                      <option value={1}>1Ф</option>
                      <option value={3}>3Ф</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={labelClass}>Гаранция (г.)</label>
                    <input
                      type="number"
                      className={numberClass}
                      value={state.system.customInverter.warrantyYears}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_SYSTEM",
                          payload: { customInverter: { ...state.system.customInverter, warrantyYears: Number(e.target.value) } },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Мониторинг платформа</label>
                    <input
                      className={inputClass}
                      value={state.system.customInverter.monitoringPlatform}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_SYSTEM",
                          payload: { customInverter: { ...state.system.customInverter, monitoringPlatform: e.target.value } },
                        })
                      }
                      placeholder="напр. FusionSolar"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-xl border border-border p-4 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={state.system.hasBattery}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_SYSTEM",
                      payload: { hasBattery: e.target.checked },
                    })
                  }
                  className="h-4 w-4 rounded border-border text-accent focus:ring-accent/30"
                />
                <span className="font-body text-sm font-medium text-foreground">
                  Батерия
                </span>
              </label>

              {state.system.hasBattery && (
                <>
                  <div>
                    <label className={labelClass}>Модел</label>
                    <select
                      className={selectClass}
                      value={state.system.batteryId}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_SYSTEM",
                          payload: { batteryId: e.target.value },
                        })
                      }
                    >
                      {batteries.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.brandName} — {b.capacityKwh.min}–
                          {b.capacityKwh.max} kWh ({b.chemistry})
                        </option>
                      ))}
                      <option value="custom">✎ Друг (ръчно)</option>
                    </select>
                  </div>

                  {state.system.batteryId === "custom" && (
                    <div className="rounded-lg border border-dashed border-accent/40 bg-accent/5 p-3 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className={labelClass}>Марка</label>
                          <input
                            className={inputClass}
                            value={state.system.customBattery.brand}
                            onChange={(e) =>
                              dispatch({
                                type: "SET_SYSTEM",
                                payload: { customBattery: { ...state.system.customBattery, brand: e.target.value } },
                              })
                            }
                            placeholder="напр. BYD"
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Капацитет (kWh)</label>
                          <input
                            type="number"
                            step="0.1"
                            className={numberClass}
                            value={state.system.customBattery.capacityKwh}
                            onChange={(e) =>
                              dispatch({
                                type: "SET_SYSTEM",
                                payload: { customBattery: { ...state.system.customBattery, capacityKwh: Number(e.target.value) } },
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className={labelClass}>Химия</label>
                          <input
                            className={inputClass}
                            value={state.system.customBattery.chemistry}
                            onChange={(e) =>
                              dispatch({
                                type: "SET_SYSTEM",
                                payload: { customBattery: { ...state.system.customBattery, chemistry: e.target.value } },
                              })
                            }
                            placeholder="напр. LFP"
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Гаранция (г.)</label>
                          <input
                            type="number"
                            className={numberClass}
                            value={state.system.customBattery.warrantyYears}
                            onChange={(e) =>
                              dispatch({
                                type: "SET_SYSTEM",
                                payload: { customBattery: { ...state.system.customBattery, warrantyYears: Number(e.target.value) } },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div>
              <label className={labelClass}>Монтаж</label>
              <div className="grid grid-cols-4 gap-2">
                {mountingTypes.map((mt) => (
                  <button
                    key={mt.id}
                    onClick={() =>
                      dispatch({
                        type: "SET_SYSTEM",
                        payload: { mountingType: mt.id },
                      })
                    }
                    className={`rounded-lg border-2 px-3 py-2 text-center font-body text-sm transition-colors ${
                      state.system.mountingType === mt.id
                        ? "border-accent bg-accent/5 text-accent font-medium"
                        : "border-border bg-white text-foreground-secondary hover:border-accent/40"
                    }`}
                  >
                    {mt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border p-4 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={state.system.hasEvCharger}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_SYSTEM",
                      payload: { hasEvCharger: e.target.checked },
                    })
                  }
                  className="h-4 w-4 rounded border-border text-accent focus:ring-accent/30"
                />
                <span className="font-body text-sm font-medium text-foreground">
                  EV Зарядна станция
                </span>
              </label>

              {state.system.hasEvCharger && (
                <div>
                  <label className={labelClass}>Мощност</label>
                  <select
                    className={selectClass}
                    value={state.system.evChargerId}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_SYSTEM",
                        payload: { evChargerId: e.target.value },
                      })
                    }
                  >
                    {evChargerTiers.map((tier) => (
                      <option key={tier.id} value={tier.id}>
                        {tier.powerKw} kW ({tier.phases}Ф) — {tier.useCase}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Step 3: Ценообразуване ── */}
        <section id="wizard-step-3">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">
            3. Ценообразуване
          </h2>

          <div className="space-y-2 mb-4">
            {state.pricing.lineItems.map((item) => (
              <div key={item.id} className="rounded-lg border border-border bg-white p-2 space-y-2">
                <div className="flex items-center gap-2">
                  {item.isDefault ? (
                    <span className="font-body text-sm font-medium text-foreground flex-1 truncate">
                      {item.label}
                    </span>
                  ) : (
                    <input
                      type="text"
                      className={inputClass + " flex-1"}
                      placeholder="Наименование"
                      value={item.label}
                      onChange={(e) =>
                        dispatch({
                          type: "RENAME_LINE_ITEM",
                          payload: { id: item.id, label: e.target.value },
                        })
                      }
                    />
                  )}
                  <span className="font-body text-sm font-semibold text-foreground whitespace-nowrap tabular-nums">
                    {fmt(item.amount * item.quantity)} €
                  </span>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "REMOVE_LINE_ITEM", payload: item.id })}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-foreground-secondary transition-colors hover:bg-red-50 hover:text-red-500"
                    title="Премахни"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min={0}
                    aria-label="Количество"
                    className="w-14 rounded-lg border border-border bg-white px-2 py-1.5 font-body text-sm text-center focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_LINE_ITEM_QUANTITY",
                        payload: { id: item.id, quantity: e.target.value === "" ? 0 : Number(e.target.value) },
                      })
                    }
                  />
                  <select
                    aria-label="Мерна единица"
                    className="w-[76px] rounded-lg border border-border bg-white px-2 py-1.5 font-body text-sm text-center appearance-none focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    value={item.unit}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_LINE_ITEM_UNIT",
                        payload: { id: item.id, unit: e.target.value },
                      })
                    }
                  >
                    {(UNIT_OPTIONS.includes(item.unit)
                      ? UNIT_OPTIONS
                      : [item.unit, ...UNIT_OPTIONS]
                    ).map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                  <span className="font-body text-xs text-foreground-secondary">×</span>
                  <input
                    type="number"
                    min={0}
                    aria-label="Единична цена"
                    placeholder="Ед. цена"
                    className="flex-1 rounded-lg border border-border bg-white px-3 py-1.5 font-body text-sm text-right focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    value={item.amount || ""}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_LINE_ITEM_AMOUNT",
                        payload: { id: item.id, amount: e.target.value === "" ? 0 : Number(e.target.value) },
                      })
                    }
                  />
                  <span className="font-body text-xs text-foreground-secondary">€</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-6">
            <button
              type="button"
              onClick={() => dispatch({ type: "ADD_LINE_ITEM" })}
              className="flex items-center gap-1 rounded-lg border border-accent/40 bg-accent/5 px-2.5 py-1.5 font-body text-xs font-medium text-accent transition-colors hover:bg-accent/10"
            >
              <Plus className="h-3.5 w-3.5" />
              Добави позиция
            </button>
            {state.pricing.lineItems.length < DEFAULT_LINE_ITEMS.length && (
              <button
                type="button"
                onClick={() => dispatch({ type: "RESTORE_DEFAULTS" })}
                className="rounded-lg border border-border px-2.5 py-1.5 font-body text-xs font-medium text-foreground-secondary transition-colors hover:bg-muted"
              >
                Възстанови стандартни
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 mb-6">
            <label className="font-body text-sm text-foreground-secondary">
              ДДС ставка (%)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              className={numberClass}
              value={state.pricing.vatRate || ""}
              onChange={(e) =>
                dispatch({
                  type: "SET_VAT_RATE",
                  payload: e.target.value === "" ? 0 : Number(e.target.value),
                })
              }
            />
          </div>

          <div className="rounded-xl border border-border bg-muted p-4 space-y-2">
            <div className="flex justify-between font-body text-sm">
              <span className="text-foreground-secondary">Сума без ДДС</span>
              <span className="text-foreground font-medium">
                {fmt(computed.totalPriceEur)} €
              </span>
            </div>
            <div className="flex justify-between font-body text-sm">
              <span className="text-foreground-secondary">ДДС</span>
              <span className="text-foreground font-medium">
                {fmt(computed.vatAmount)} €
              </span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between font-body text-base">
              <span className="text-foreground font-semibold">Сума с ДДС</span>
              <span className="text-accent font-bold">
                {fmt(computed.totalWithVat)} €
              </span>
            </div>
          </div>
        </section>

        {/* ── Step 4: Слайдове ── */}
        <section id="wizard-step-4">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">
            4. Слайдове
          </h2>

          <div className="space-y-1">
            {state.slides.map((slide) => (
              <label
                key={slide.id}
                className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted transition-colors cursor-pointer"
              >
                <span className="font-body text-sm text-foreground">
                  {slide.label}
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={slide.enabled}
                  onClick={() =>
                    dispatch({ type: "TOGGLE_SLIDE", payload: slide.id })
                  }
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
                    slide.enabled ? "bg-accent" : "bg-border"
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${
                      slide.enabled ? "translate-x-[18px]" : "translate-x-[3px]"
                    }`}
                  />
                </button>
              </label>
            ))}
          </div>
        </section>
      </div>

      <div className="sticky bottom-0 border-t border-border bg-background px-5 py-4 space-y-3">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm font-body">
          <span className="text-foreground-secondary">Мощност</span>
          <span className="text-foreground font-medium text-right">
            {fmt(computed.systemKwp, 2)} kWp
          </span>
          <span className="text-foreground-secondary">Годишно производство</span>
          <span className="text-foreground font-medium text-right">
            {fmt(computed.annualProductionKwh)} kWh
          </span>
          <span className="text-foreground-secondary">Възвръщаемост</span>
          <span className="text-foreground font-medium text-right">
            {fmt(computed.paybackYears, 1)} год.
          </span>
          <span className="text-foreground-secondary">Спестявания (25 г.)</span>
          <span className="text-accent font-semibold text-right">
            {fmt(computed.savings25Year)} €
          </span>
        </div>

        <button
          onClick={onExport}
          className="w-full rounded-xl bg-accent py-2.5 font-display text-sm font-semibold text-white transition-colors hover:bg-accent/90"
        >
          Експорт
        </button>
      </div>
    </div>
  );
}
