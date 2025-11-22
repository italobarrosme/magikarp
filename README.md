# Nezuko 3 - Boilerplate Next.js

> **Atualizado em:** 18/11/2025

Boilerplate para desenvolvimento de aplicações Next.js com TypeScript, seguindo práticas de arquitetura e padrões de código.

## 📦 Instalação

Para criar um novo projeto usando este boilerplate como template:

```bash
npx create-next-app@latest teu-app -e https://github.com/italobarrosme/nezuko-3
```

Ou usando o comando completo com todas as opções:

```bash
npx create-next-app@latest my-app \
  --example https://github.com/italobarrosme/nezuko-3 \
  --typescript \
  --tailwind \
  --app \
  --use-npm
```

**Alternativa via Git:**

```bash
git clone https://github.com/italobarrosme/nezuko-3.git my-app
cd my-app
npm install
```

## 🚀 Stacks e Tecnologias

### Core

- **Next.js 15.5.2** - Framework React com App Router
- **React 19.1.0** - Biblioteca UI
- **TypeScript 5.8.3** - Tipagem estática

### Estilização

- **Tailwind CSS 4.1.10** - Framework CSS utility-first
- **PostCSS** - Processamento de CSS
- **Autoprefixer** - Compatibilidade de navegadores
- **CSS Variables** - Sistema de design token com suporte a dark/light mode

### Estado e Dados

- **Zustand 5.0.5** - Gerenciamento de estado global
- **Prisma 6.9.0** - ORM para banco de dados
- **React Hook Form 7.57.0** - Gerenciamento de formulários
- **Zod 3.25.63** - Validação de schemas

### HTTP Client

- **Ky 1.8.1** - Cliente HTTP moderno

### Testes

- **Vitest 3.2.3** - Framework de testes
- **Testing Library** - Utilitários para testes de componentes
- **jsdom** - Ambiente DOM para testes

### Qualidade de Código

- **Biome 1.9.4** - Linter e formatter (substitui ESLint/Prettier)
- **Commitlint** - Validação de mensagens de commit (Conventional Commits)
- **Lefthook** - Git hooks manager

### PWA

- **next-pwa 5.6.0** - Progressive Web App support

### Utilitários

- **clsx** - Concatenação condicional de classes
- **tailwind-merge** - Merge de classes Tailwind
- **class-variance-authority** - Variantes de componentes
- **usehooks-ts** - Coleção de hooks TypeScript
- **@iconify/react** - Biblioteca de ícones

## 📁 Estrutura de Pastas

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Layout raiz
│   └── page.tsx            # Página inicial
├── modules/                 # Módulos da aplicação
│   ├── common/             # Módulo comum
│   │   ├── components/     # Componentes compartilhados
│   │   ├── hooks/          # Hooks compartilhados
│   │   └── http/           # Configuração HTTP
│   └── theme/              # Módulo de tema
│       ├── components/     # Componentes de tema
│       ├── hooks/          # Hooks de tema
│       ├── store/          # Store Zustand
│       └── types/          # Tipos TypeScript
├── providers/              # Providers da aplicação
│   └── Providers.tsx       # Provider centralizado
├── styles/                 # Estilos globais
│   ├── globals.css         # CSS global
│   └── keyframes.css       # Animações
└── utils/                  # Utilitários
    ├── cn/                 # Função para classes
    └── ...
```

## 🎨 Padrões de Criação de Componentes

### Arquitetura: Container e Presentational Components + Custom Hooks

O projeto segue o padrão de **Container/Presentational Components** combinado com **Custom Hooks** para separação de responsabilidades:

#### 1. **Container Components (Render Components)**

- Componentes **Server Components** (Next.js)
- Responsáveis pela **lógica**: estado, chamadas de API, manipulação de dados
- Geralmente localizados em `src/app/` ou como `*Render.tsx` nos módulos

#### 2. **Presentational Components (Dumb Components)**

- Componentes **Client Components** (`'use client'`)
- Responsáveis **somente por renderizar** a interface
- Não sabem de onde vêm os dados, apenas recebem via props
- Localizados em `src/modules/*/components/`

#### 3. **Custom Hooks**

- Extração de lógica de negócio
- Facilita testes e reutilização
- Localizados em `src/modules/*/hooks/`

### Estrutura de Módulo

```
/module
  /employees
    EmployeeListRender.tsx       → Container Component (Server)
    /types
      index.ts                   → Gerenciamento de tipos
    /hooks
      useEmployeeLogic.ts        → Hook (regra de negócio)
      useEmployeeLogic.spec.ts   → Test Hook
    /components/
      EmployeeList.tsx           → Presentational Component
      EmployeeCard.tsx           → Presentational Subcomponent
      EmployeeCard.spec.tsx      → Test Subcomponent
```

### Exemplo Prático

#### Hook com Lógica Pura

```tsx
// useEmployeeLogic.ts
import { useMemo } from "react";
import { Employee } from "../types";

/**
 * Hook responsável por aplicar regras de negócio e formatação
 * sobre a lista de funcionários recebida.
 */
export function useEmployeeLogic(employees: Employee[]) {
  return useMemo(() => {
    const formatted = employees.map((emp) => ({
      ...emp,
      formattedSalary: emp.salary.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      statusLabel: emp.active ? "Ativo" : "Inativo",
      statusColor: emp.active ? "text-green-500" : "text-red-500",
    }));

    const totalEmployees = employees.length;
    const activeCount = employees.filter((e) => e.active).length;

    return {
      formatted,
      summary: {
        totalEmployees,
        activeCount,
      },
    };
  }, [employees]);
}
```

#### UI Pura (Presentational)

```tsx
// EmployeeList.tsx
"use client";

import { EmployeeCard } from "./EmployeeCard";
import { useEmployeeLogic } from "../hooks/useEmployeeLogic";
import { Employee } from "../types";

type EmployeeListProps = {
  employees: Employee[];
};

export function EmployeeList({ employees }: EmployeeListProps) {
  const { formatted, summary } = useEmployeeLogic(employees);

  return (
    <div className="space-y-4">
      <header>
        <span>Total: {summary.totalEmployees}</span>
        <span>Ativos: {summary.activeCount}</span>
      </header>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {formatted.map((emp) => (
          <EmployeeCard key={emp.id} employee={emp} />
        ))}
      </div>
    </div>
  );
}
```

#### Render Component (Container)

```tsx
// EmployeeListRender.tsx
import { Employee } from "../types";
import { EmployeeList } from "./components/EmployeeList";
import { getEmployeesAction } from "../actions";

export default async function EmployeeListRender() {
  const employees = await getEmployeesAction();

  return (
    <section className="mx-auto max-w-4xl space-y-6 p-6">
      <header>
        <h2 className="text-xl font-semibold">Equipe</h2>
        <p className="text-sm text-zinc-400">Lista de funcionários</p>
      </header>

      <EmployeeList employees={employees} />
    </section>
  );
}
```

### Convenções de Nomenclatura

- **Componentes**: PascalCase (`ButtonThemeToggle.tsx`)
- **Hooks**: camelCase com prefixo `use` (`useTheme.ts`)
- **Types**: PascalCase (`Theme.ts`, `ThemeState.ts`)
- **Utils**: camelCase (`formatCurrencyToBRL.ts`)
- **Arquivos de teste**: `*.spec.tsx` ou `*.test.tsx`

### Estrutura de Arquivo de Componente

````tsx
'use client' // Apenas se necessário (Client Component)

import { ... } from '...'

type ComponentProps = {
  // Props tipadas
}

/**
 * Descrição do componente.
 *
 * @example
 * ```tsx
 * <Component prop="value" />
 * ```
 */
export function Component({ ...props }: ComponentProps) {
  // Lógica do componente
  return (
    // JSX
  )
}
````

## 🛠️ Scripts Disponíveis

### Desenvolvimento

```bash
npm run dev          # Inicia servidor de desenvolvimento (porta 3002)
```

### Build e Produção

```bash
npm run build        # Gera build de produção
npm run start        # Inicia servidor de produção
```

### Testes

```bash
npm run test         # Executa testes em modo watch
npm run test:deploy  # Executa testes uma vez (CI/CD)
npm run test:coverage # Executa testes com cobertura
npm run test:snapshot # Atualiza snapshots
```

### Qualidade de Código

```bash
npm run lint         # Verifica código com Biome
npm run lint:fix     # Corrige problemas automaticamente
npm run format       # Formata código
npm run format:check # Verifica formatação
```

### Git Hooks

```bash
npm run lefthook-install # Instala hooks do Git
```

### Docker

```bash
npm run docker-up    # Inicia containers Docker
npm run docker-down  # Para containers Docker
```

## 🔧 Configurações Importantes

### Git Hooks (Lefthook)

O projeto utiliza **Lefthook** para gerenciar hooks do Git:

- **pre-commit**: Executa Biome e testes relacionados aos arquivos modificados
- **pre-push**: Executa build, testes completos e validação de commits (Commitlint)

### Commit Messages

O projeto segue o padrão **Conventional Commits**:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Tipos permitidos:**

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `perf`: Performance
- `test`: Testes
- `build`: Build system
- `ci`: CI/CD
- `chore`: Manutenção

### Path Aliases

O projeto utiliza path aliases configurados no `tsconfig.json`:

```typescript
import { Component } from "@/modules/common/components";
// Equivale a: src/modules/common/components
```

### Sistema de Tema

O projeto possui sistema completo de tema com:

- **Dark/Light mode** com Zustand + localStorage
- **CSS Variables** para cores
- **Tailwind custom variant** para dark mode
- **ThemeProvider** centralizado

## 🧪 Testes

Os testes são escritos com **Vitest** e **Testing Library**:

```tsx
// Component.spec.tsx
import { render, screen } from "@testing-library/react";
import { Component } from "./Component";

describe("Component", () => {
  it("should render correctly", () => {
    render(<Component />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

---

**Todo dia crescendo 1%**
