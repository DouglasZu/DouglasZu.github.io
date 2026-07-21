from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    PageTemplate,
    Paragraph,
    Spacer,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "curriculo-douglas-zulim.pdf"

NAVY = colors.HexColor("#0A0F1C")
CYAN = colors.HexColor("#009BC2")
VIOLET = colors.HexColor("#6D3BC5")
SLATE = colors.HexColor("#475569")
LIGHT = colors.HexColor("#CBD5E1")


class ResumeDocTemplate(BaseDocTemplate):
    def __init__(self, filename):
        super().__init__(
            filename,
            pagesize=A4,
            leftMargin=17 * mm,
            rightMargin=17 * mm,
            topMargin=16 * mm,
            bottomMargin=15 * mm,
            title="Curriculo - Douglas Zulim",
            author="Douglas Zulim",
            subject="QA Engineer",
        )
        frame = Frame(
            self.leftMargin,
            self.bottomMargin,
            self.width,
            self.height,
            leftPadding=0,
            rightPadding=0,
            topPadding=0,
            bottomPadding=0,
        )
        self.addPageTemplates(PageTemplate(id="resume", frames=[frame], onPage=draw_page))


def draw_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, A4[1] - 5 * mm, A4[0], 5 * mm, stroke=0, fill=1)
    canvas.setFillColor(CYAN)
    canvas.rect(0, A4[1] - 5 * mm, 58 * mm, 5 * mm, stroke=0, fill=1)
    canvas.setStrokeColor(LIGHT)
    canvas.line(doc.leftMargin, 10 * mm, A4[0] - doc.rightMargin, 10 * mm)
    canvas.setFillColor(SLATE)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(doc.leftMargin, 6.3 * mm, "Douglas Zulim - QA Engineer")
    canvas.drawRightString(A4[0] - doc.rightMargin, 6.3 * mm, f"Página {doc.page}")
    canvas.restoreState()


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Name", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=25, leading=28, textColor=NAVY, alignment=TA_CENTER, spaceAfter=3))
styles.add(ParagraphStyle(name="Role", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=12, leading=15, textColor=CYAN, alignment=TA_CENTER, spaceAfter=5))
styles.add(ParagraphStyle(name="Contact", parent=styles["Normal"], fontName="Helvetica", fontSize=8.3, leading=11, textColor=SLATE, alignment=TA_CENTER, spaceAfter=9))
styles.add(ParagraphStyle(name="Section", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=11.5, leading=14, textColor=NAVY, spaceBefore=8, spaceAfter=5, keepWithNext=True))
styles.add(ParagraphStyle(name="Body", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.7, leading=12.2, textColor=SLATE, alignment=TA_LEFT, spaceAfter=5))
styles.add(ParagraphStyle(name="Job", parent=styles["Heading3"], fontName="Helvetica-Bold", fontSize=10.2, leading=13, textColor=NAVY, spaceBefore=6, spaceAfter=1, keepWithNext=True))
styles.add(ParagraphStyle(name="JobMeta", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=8.1, leading=10.5, textColor=VIOLET, spaceAfter=4, keepWithNext=True))
styles.add(ParagraphStyle(name="ResumeBullet", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.25, leading=11.2, textColor=SLATE, leftIndent=11, firstLineIndent=-7, bulletIndent=0, spaceAfter=2.6))
styles.add(ParagraphStyle(name="Skill", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.4, leading=11.4, textColor=SLATE, spaceAfter=4))


def section(title):
    return [Paragraph(title.upper(), styles["Section"]), HRFlowable(width="100%", thickness=0.8, color=CYAN, spaceAfter=5)]


def bullet(text):
    return Paragraph(f"- {text}", styles["ResumeBullet"])


story = [
    Paragraph("Douglas Zulim", styles["Name"]),
    Paragraph("QA Engineer | Automação, APIs e Confiabilidade", styles["Role"]),
    Paragraph(
        "Sorocaba-SP, Brasil &nbsp; | &nbsp; douglaszulim@gmail.com &nbsp; | &nbsp; "
        "linkedin.com/in/douglas-zulim-894287a6 &nbsp; | &nbsp; github.com/DouglasZu",
        styles["Contact"],
    ),
]

story += section("Resumo profissional")
story.append(Paragraph(
    "QA Engineer com cinco anos de experiência em Qualidade de Software, atuando com automação de testes, "
    "validação de APIs, testes integrados e investigação de defeitos. Experiência com Playwright, TypeScript, "
    "Postman, Selenium, Python e SQL, além de troubleshooting, integrações, pagamentos, webhooks e validação de releases.",
    styles["Body"],
))

story += section("Experiência profissional")
story += [
    Paragraph("Analista de Qualidade - Eduzz", styles["Job"]),
    Paragraph("06/2021 - 06/2026 | Tempo integral", styles["JobMeta"]),
    bullet("Desenvolvimento e manutenção de testes automatizados com Playwright e TypeScript para APIs e aplicações Web/Desktop."),
    bullet("Contribuição na manutenção e evolução de uma suíte com mais de 600 cenários automatizados."),
    bullet("Participação na validação de aproximadamente 15 a 20 releases mensais, priorizando fluxos críticos e riscos de regressão."),
    bullet("Planejamento e execução de testes funcionais, exploratórios, integrados e de regressão."),
    bullet("Validação de APIs REST com Postman, analisando status HTTP, payloads, contratos e regras de negócio."),
    bullet("Investigação de defeitos e inconsistências utilizando SQL, logs e evidências técnicas."),
    bullet("Participação em refinamentos e definição de critérios de aceitação com desenvolvimento e produto."),
    bullet("Atuação em fluxos de pagamentos, Pix Automático, PSPs e webhooks."),
    bullet("Versionamento de projetos com Git e execução de testes em fluxos de CI/CD utilizando Jenkins."),
    Spacer(1, 2),
    Paragraph("Analista de Suporte Pleno - Eduzz", styles["Job"]),
    Paragraph("01/2021 - 05/2021 | Tempo integral", styles["JobMeta"]),
    bullet("Atendimento técnico e investigação de problemas reportados por clientes."),
    bullet("Análise de inconsistências utilizando SQL."),
    bullet("Registro de incidentes, problemas e solicitações de melhoria no Jira."),
    bullet("Participação em triagens e reuniões de defeitos."),
    bullet("Documentação de cenários e evidências para apoiar a investigação técnica."),
    Spacer(1, 2),
    Paragraph("Analista de Suporte Júnior - Eduzz", styles["Job"]),
    Paragraph("09/2019 - 12/2020 | Tempo integral", styles["JobMeta"]),
    bullet("Atendimento aos clientes por e-mail e chat."),
    bullet("Configuração e suporte a pixels, webhooks e produtos da plataforma."),
    bullet("Análise inicial de problemas e encaminhamento para equipes técnicas."),
    bullet("Desenvolvimento de conhecimento sobre regras de negócio e experiência do usuário."),
]

story += section("Competencias")
story += [
    Paragraph("<b>Experiência profissional:</b> Playwright, TypeScript, Postman, Selenium, SQL, Git, Jira, Jenkins, CI/CD, Scrum e Kanban.", styles["Skill"]),
    Paragraph("<b>Projetos práticos:</b> GitHub Actions, Cypress, Pytest, Rest Assured, Docker e k6.", styles["Skill"]),
    Paragraph("<b>Em aprendizado:</b> JMeter, JUnit, Grafana e Kibana.", styles["Skill"]),
    Paragraph("<b>Abordagens:</b> testes funcionais, exploratórios, integração e regressão; critérios de aceitação; gestão de defeitos; estratégia baseada em risco; troubleshooting.", styles["Skill"]),
]

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
ResumeDocTemplate(str(OUTPUT)).build(story)
print(OUTPUT)
