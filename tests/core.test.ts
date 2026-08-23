import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { applyApproval, createDeckFromPrompt, initialState, updateSlideElement } from "../src/core"

describe("Osamah Agent core", () => {
  it("creates a meaningful local deck from a prompt", () => {
    const deck = createDeckFromPrompt("AI in higher education")
    assert.equal(deck.title, "AI in higher education")
    assert.equal(deck.slides.length, 3)
    assert.ok(deck.slides.every((slide) => slide.title.length > 0))
  })

  it("updates one stable slide element without mutating the source deck", () => {
    const source = initialState.presentation
    const next = updateSlideElement(source, "slide-1", "el-1", { text: "Updated title" })
    assert.equal(source.slides[0].elements[0].text, "One workspace.\nTwo modes.")
    assert.equal(next.slides[0].elements[0].text, "Updated title")
  })

  it("records approval decisions in history", () => {
    const next = applyApproval(initialState, "approval-delete-slide", "approved")
    assert.equal(next.approvals[0].status, "approved")
    assert.match(next.history.at(-1) ?? "", /Approved/)
  })
})
